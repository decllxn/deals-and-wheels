from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from django.utils import timezone

from .models import CarListing
from dealers.models import Dealer
from dealer_dashboard.models import ListingEvent, DealerDailyMetrics


@receiver(pre_save, sender=CarListing)
def carlisting_pre_save(sender, instance, **kwargs):
    """
    Detect when a listing transitions from unsold → sold.
    We'll use this info in post_save to create a 'sold' event.
    """
    if not instance.pk:
        instance._was_sold = False
        return

    try:
        prev = CarListing.objects.get(pk=instance.pk)
        instance._was_sold = prev.is_sold
    except CarListing.DoesNotExist:
        instance._was_sold = False


@receiver(post_save, sender=CarListing)
def carlisting_post_save(sender, instance, created, **kwargs):
    """
    Triggered when a CarListing is created or updated.
    Logs listing events and updates dealer stats & daily metrics.
    """
    dealer = instance.dealer
    if not dealer:
        return  # skip private sellers

    # --- 1️⃣ Create event logs ---
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
        metadata={"price": str(instance.price), "location": instance.location},
    )

    # --- 2️⃣ Update dealer-level counters ---
    dealer.update_stats()

    # --- 3️⃣ Update (or create) daily metrics snapshot ---
    today = timezone.now().date()
    metrics, _ = DealerDailyMetrics.objects.get_or_create(dealer=dealer, date=today)

    # Refresh from DB to avoid stale counts
    from django.db.models import Avg, Count
    listings_qs = dealer.car_listings.all()
    active_qs = listings_qs.filter(is_sold=False)
    sold_qs = listings_qs.filter(is_sold=True)

    metrics.total_listings = listings_qs.count()
    metrics.active_listings = active_qs.count()
    metrics.sold_listings = sold_qs.count()
    metrics.new_listings = listings_qs.filter(created_at__date=today).count()
    metrics.avg_price = listings_qs.aggregate(avg=Avg("price"))["avg"] or 0
    metrics.median_price = (
        listings_qs.order_by("price")
        .values_list("price", flat=True)
        .annotate(cnt=Count("price"))
        .first()
        or 0
    )
    metrics.avg_age_days = listings_qs.aggregate(
        avg=models.Avg((timezone.now() - models.F("created_at")).days)
    )["avg"] or 0

    # Recompute health & sell-through rate
    metrics.sell_through_rate = metrics.sell_through_display
    metrics.compute_health_score()
    metrics.save(update_fields=[
        "total_listings", "active_listings", "sold_listings", "new_listings",
        "avg_price", "median_price", "avg_age_days", "sell_through_rate",
        "health_score", "updated_at"
    ])


@receiver(post_delete, sender=CarListing)
def carlisting_post_delete(sender, instance, **kwargs):
    """
    Triggered when a CarListing is deleted.
    Creates a 'deleted' event and updates dealer metrics accordingly.
    """
    dealer = instance.dealer
    if not dealer:
        return

    ListingEvent.objects.create(
        dealer=dealer,
        listing=None,
        event_type="deleted",
        metadata={"title": instance.title, "price": str(instance.price)},
    )

    # Update dealer counters and daily metrics
    dealer.update_stats()

    today = timezone.now().date()
    metrics, _ = DealerDailyMetrics.objects.get_or_create(dealer=dealer, date=today)
    metrics.total_listings = dealer.car_listings.count()
    metrics.active_listings = dealer.car_listings.filter(is_sold=False).count()
    metrics.sold_listings = dealer.car_listings.filter(is_sold=True).count()
    metrics.sell_through_rate = metrics.sell_through_display
    metrics.compute_health_score()
    metrics.save(update_fields=["total_listings", "active_listings", "sold_listings", "sell_through_rate", "health_score", "updated_at"])