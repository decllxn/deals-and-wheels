# car_listings/signals.py
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from django.db.models import Avg
from django.db import models

from .models import CarListing
from dealers.models import Dealer
from dealer_dashboard.models import ListingEvent, DealerDailyMetrics
from dealer_dashboard.tasks import compute_daily_metrics_for_date


# ============================================================
# 1️⃣ Pre-save: Detect transitions (unsold → sold)
# ============================================================
@receiver(pre_save, sender=CarListing)
def carlisting_pre_save(sender, instance, **kwargs):
    """
    Detect when a listing transitions from unsold → sold,
    so we can correctly tag the event type in post_save.
    """
    if not instance.pk:
        instance._was_sold = False
        return

    try:
        prev = CarListing.objects.get(pk=instance.pk)
        instance._was_sold = prev.is_sold
    except CarListing.DoesNotExist:
        instance._was_sold = False


# ============================================================
# 2️⃣ Post-save: Log events, update dealer stats, and recompute metrics
# ============================================================
@receiver(post_save, sender=CarListing)
def carlisting_post_save(sender, instance, created, **kwargs):
    """
    Triggered when a CarListing is created or updated.
    Logs events, updates dealer counters, and triggers Celery metrics recomputation.
    """
    dealer = instance.dealer
    if not dealer:
        return  # Skip if private or unlinked seller

    # --- 1️⃣ Create structured event log ---
    if created:
        event_type = "created"
    elif not instance._was_sold and instance.is_sold:
        event_type = "sold"
    else:
        event_type = "updated"

    ListingEvent.objects.create(
        dealer=dealer,
        listing=instance,
        event_type=event_type,
        metadata={
            "title": instance.title,
            "price": str(instance.price),
            "location": getattr(instance, "location", ""),
        },
    )

    # --- 2️⃣ Update dealer-level stats (sync) ---
    dealer.update_stats()

    # --- 3️⃣ Ensure daily metrics snapshot exists ---
    today = timezone.now().date()
    metrics, _ = DealerDailyMetrics.objects.get_or_create(dealer=dealer, date=today)

    # --- 4️⃣ Update quick aggregates (non-blocking) ---
    listings_qs = dealer.car_listings.all()
    metrics.total_listings = listings_qs.count()
    metrics.active_listings = listings_qs.filter(is_sold=False).count()
    metrics.sold_listings = listings_qs.filter(is_sold=True).count()
    metrics.new_listings = listings_qs.filter(created_at__date=today).count()
    metrics.avg_price = listings_qs.aggregate(avg=Avg("price"))["avg"] or 0

    # Compute sell-through rate & health score
    metrics.sell_through_rate = (
        metrics.sold_listings / metrics.active_listings
        if metrics.active_listings > 0
        else 0
    )
    metrics.compute_health_score()
    metrics.save(
        update_fields=[
            "total_listings",
            "active_listings",
            "sold_listings",
            "new_listings",
            "avg_price",
            "sell_through_rate",
            "health_score",
            "updated_at",
        ]
    )

    # --- 5️⃣ Trigger async Celery recompute for deep metrics ---
    try:
        compute_daily_metrics_for_date.delay(
            dealer_id=dealer.id,
            date_str=str(instance.updated_at.date()),
        )
    except Exception:
        # Fail gracefully if Celery isn’t running
        pass


# ============================================================
# 3️⃣ Post-delete: Log deletion and update dealer metrics
# ============================================================
@receiver(post_delete, sender=CarListing)
def carlisting_post_delete(sender, instance, **kwargs):
    """
    Triggered when a CarListing is deleted.
    Creates a 'deleted' event and updates dealer metrics accordingly.
    """
    dealer = instance.dealer
    if not dealer:
        return

    # --- Log deletion event ---
    ListingEvent.objects.create(
        dealer=dealer,
        listing=None,
        event_type="deleted",
        metadata={"title": instance.title, "price": str(instance.price)},
    )

    # --- Update dealer counters ---
    dealer.update_stats()

    # --- Update today’s daily metrics snapshot ---
    today = timezone.now().date()
    metrics, _ = DealerDailyMetrics.objects.get_or_create(dealer=dealer, date=today)
    listings_qs = dealer.car_listings.all()
    metrics.total_listings = listings_qs.count()
    metrics.active_listings = listings_qs.filter(is_sold=False).count()
    metrics.sold_listings = listings_qs.filter(is_sold=True).count()
    metrics.sell_through_rate = (
        metrics.sold_listings / metrics.active_listings
        if metrics.active_listings > 0
        else 0
    )
    metrics.compute_health_score()
    metrics.save(
        update_fields=[
            "total_listings",
            "active_listings",
            "sold_listings",
            "sell_through_rate",
            "health_score",
            "updated_at",
        ]
    )

    # --- Trigger async recomputation ---
    try:
        compute_daily_metrics_for_date.delay(
            dealer_id=dealer.id,
            date_str=str(today),
        )
    except Exception:
        pass