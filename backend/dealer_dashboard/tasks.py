# dealer_dashboard/tasks.py
from celery import shared_task
from django.utils import timezone
from django.db import transaction
from django.db.models import Avg, Count, Q, F
from datetime import timedelta

from dealers.models import Dealer
from car_listings.models import CarListing
from .models import DealerDailyMetrics


@shared_task
def compute_daily_metrics_for_date(date_str=None, dealer_id=None):
    """
    Compute daily metrics for all dealers (or a specific dealer) for the given date.
    Used for both scheduled aggregation and ad-hoc recomputation after listing updates.
    """
    # Resolve date (default to today)
    date = (
        timezone.datetime.fromisoformat(date_str).date()
        if date_str
        else timezone.now().date()
    )

    # Limit to a specific dealer if provided
    dealers_qs = Dealer.objects.filter(id=dealer_id) if dealer_id else Dealer.objects.all()

    for dealer in dealers_qs:
        compute_metrics_for_dealer(dealer, date)


def compute_metrics_for_dealer(dealer, date):
    """
    Compute and persist DealerDailyMetrics for a single dealer.
    Handles aggregates for listings, performance, and engagement.
    """
    qs = CarListing.objects.filter(dealer=dealer)

    total_listings = qs.count()
    new_listings = qs.filter(created_at__date=date).count()
    sold_listings = qs.filter(is_sold=True, updated_at__date=date).count()
    active_listings = qs.filter(is_sold=False).count()

    avg_price = qs.aggregate(avg=Avg("price"))["avg"]
    median_price = _compute_median(qs, "price")
    avg_age_days = _compute_avg_age_days(qs)

    # Engagement placeholders (to be replaced by actual analytics tracking)
    views = 0
    leads = 0

    # Derived metrics
    sell_through_rate = (sold_listings / active_listings) if active_listings > 0 else 0

    # Update or create record safely
    with transaction.atomic():
        obj, created = DealerDailyMetrics.objects.update_or_create(
            dealer=dealer,
            date=date,
            defaults={
                "total_listings": total_listings,
                "new_listings": new_listings,
                "sold_listings": sold_listings,
                "active_listings": active_listings,
                "avg_price": avg_price or 0,
                "median_price": median_price or 0,
                "avg_age_days": avg_age_days,
                "views": views,
                "leads": leads,
                "sell_through_rate": sell_through_rate,
            },
        )
        obj.compute_health_score()
        obj.save()

    return obj


def _compute_avg_age_days(qs):
    """Compute average age (in days) for listings."""
    if not qs.exists():
        return 0.0
    today = timezone.now().date()
    ages = [
        (today - listing.created_at.date()).days
        for listing in qs.only("created_at")
        if listing.created_at
    ]
    return round(sum(ages) / len(ages), 2) if ages else 0.0


def _compute_median(qs, field):
    """Compute approximate median for numeric field."""
    count = qs.count()
    if count == 0:
        return 0
    middle = count // 2
    sorted_values = list(qs.order_by(field).values_list(field, flat=True))
    if count % 2:
        return sorted_values[middle]
    return (sorted_values[middle - 1] + sorted_values[middle]) / 2
