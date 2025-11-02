# car_listings/utils.py
import logging
import math
from collections import Counter
from django.db.models import Q, F
from django.core.cache import cache
from django.conf import settings
from pytrends.request import TrendReq
from .models import CarListing

logger = logging.getLogger(__name__)

SEARCH_TRACKING_KEY = "popular_searches"
CACHE_TIMEOUT = 60 * 15  # 15 minutes

# --------------------------------------------------------
# 🚀 SMART SIMILAR LISTINGS ALGORITHM
# --------------------------------------------------------

def get_similar_listings(car_instance, limit=8):
    """
    Return a list of similar CarListing instances based on multi-factor similarity.
    Factors include:
    - Make, model, year (core match)
    - Price proximity (within ±25%)
    - Body style, drivetrain, fuel_type match
    - Mileage proximity
    - Location or dealer similarity (optional boost)
    """

    if not car_instance:
        return CarListing.objects.none()

    # Exclude the car itself
    queryset = CarListing.objects.exclude(id=car_instance.id).filter(is_sold=False)

    # Base candidate filter (same make/model first)
    candidates = queryset.filter(
        Q(make__iexact=car_instance.make)
        | Q(model__iexact=car_instance.model)
        | Q(body_style=car_instance.body_style)
    )

    # Prepare numeric ranges for price and mileage similarity
    price_min = float(car_instance.price) * 0.75
    price_max = float(car_instance.price) * 1.25
    mileage_min = max(car_instance.mileage - 40000, 0)
    mileage_max = car_instance.mileage + 40000

    candidates = candidates.filter(
        price__gte=price_min,
        price__lte=price_max,
        mileage__gte=mileage_min,
        mileage__lte=mileage_max,
    )

    # Preload related fields for performance
    candidates = candidates.select_related("manufacturer", "dealer")

    # ---------------------------------------
    # 🔹 Scoring Function (Weighted Similarity)
    # ---------------------------------------
    def compute_score(car):
        score = 0

        # Category weights (tweak these to fine-tune results)
        weights = {
            "make_model": 3,
            "year": 1.5,
            "body_style": 1.2,
            "fuel_type": 1,
            "drivetrain": 1,
            "price": 2,
            "mileage": 1,
            "condition": 1,
            "location": 0.8,
            "dealer": 0.5,
        }

        # Make/Model similarity
        if car.make.lower() == car_instance.make.lower():
            score += weights["make_model"]
        if car.model.lower() == car_instance.model.lower():
            score += weights["make_model"]

        # Year proximity (closer = higher)
        year_diff = abs(car.year - car_instance.year)
        score += max(0, weights["year"] - (year_diff * 0.1))

        # Matching categorical features
        for field, weight in [
            ("body_style", weights["body_style"]),
            ("fuel_type", weights["fuel_type"]),
            ("drivetrain", weights["drivetrain"]),
            ("condition", weights["condition"]),
        ]:
            if getattr(car, field, None) == getattr(car_instance, field, None):
                score += weight

        # Price closeness (scaled)
        try:
            price_ratio = min(float(car.price), float(car_instance.price)) / max(float(car.price), float(car_instance.price))
            score += price_ratio * weights["price"]
        except Exception:
            pass

        # Mileage proximity (scaled)
        if car.mileage and car_instance.mileage:
            mileage_ratio = min(car.mileage, car_instance.mileage) / max(car.mileage, car_instance.mileage)
            score += mileage_ratio * weights["mileage"]

        # Optional: location or dealer similarity
        if car.dealer and car_instance.dealer and car.dealer == car_instance.dealer:
            score += weights["dealer"]
        elif car.location and car_instance.location and car.location.split(",")[0].strip().lower() == car_instance.location.split(",")[0].strip().lower():
            score += weights["location"]

        return round(score, 3)

    # Compute similarity scores
    scored_candidates = [(car, compute_score(car)) for car in candidates]
    scored_candidates.sort(key=lambda x: x[1], reverse=True)

    # Return top N results
    similar = [car for car, _ in scored_candidates[:limit]]
    return similar


# --------------------------------------------------------
# 🔹 Existing Tracking Functions (kept intact)
# --------------------------------------------------------

def track_search(query: str):
    """Track user searches locally in cache."""
    query = query.strip().lower()
    if not query:
        return

    searches = cache.get(SEARCH_TRACKING_KEY, Counter())
    if not isinstance(searches, Counter):
        searches = Counter()

    searches[query] += 1
    cache.set(SEARCH_TRACKING_KEY, searches, CACHE_TIMEOUT)
    logger.info(f"Tracked search: {query}")


def get_popular_searches(limit: int = 5):
    """Combine local search tracking with Google Trends."""
    searches = cache.get(SEARCH_TRACKING_KEY, Counter())
    local_scores = dict(searches)

    keywords = list(local_scores.keys()) or ["toyota", "nissan", "subaru", "mazda", "mercedes"]

    external_trends = {}
    try:
        pytrends = TrendReq(hl="en-US", tz=360)
        pytrends.build_payload(kw_list=keywords, timeframe="now 7-d", geo="KE")
        trends = pytrends.interest_over_time()
        external_trends = {kw: int(trends[kw].sum()) for kw in keywords if kw in trends}
    except Exception as e:
        logger.warning(f"Google Trends fetch failed: {e}")

    combined_scores = {}
    for term in set(local_scores.keys()) | set(external_trends.keys()):
        local_score = local_scores.get(term, 0)
        web_score = external_trends.get(term, 0)
        combined_scores[term] = (local_score * 0.7) + (web_score * 0.3)

    ranked = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
    return [term for term, _ in ranked[:limit]]