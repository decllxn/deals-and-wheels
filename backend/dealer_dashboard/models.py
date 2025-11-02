from django.db import models
from django.conf import settings


class ListingEvent(models.Model):
    """
    Event log capturing actions on listings for data-driven insights.
    Useful for future funnel analysis, performance attribution, and replay analytics.
    """

    EVENT_CHOICES = [
        ("created", "Created"),
        ("updated", "Updated"),
        ("view", "View"),
        ("lead", "Lead"),
        ("sold", "Sold"),
        ("deleted", "Deleted"),
    ]

    dealer = models.ForeignKey(
        "dealers.Dealer", on_delete=models.CASCADE, related_name="listing_events"
    )
    listing = models.ForeignKey(
        "car_listings.CarListing",
        on_delete=models.CASCADE,
        related_name="listing_events",
        null=True,
        blank=True,
    )
    event_type = models.CharField(max_length=32, choices=EVENT_CHOICES)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["dealer", "event_type", "created_at"]),
            models.Index(fields=["created_at"]),
        ]
        verbose_name = "Listing Event"
        verbose_name_plural = "Listing Events"

    def __str__(self):
        return f"{self.dealer.name} - {self.event_type} ({self.created_at.date()})"


class DealerDailyMetrics(models.Model):
    """
    Precomputed daily metrics for each dealer — optimized for charting and dashboards.
    Enables fast data aggregation for KPIs and visualization libraries like Chart.js.
    """

    dealer = models.ForeignKey(
        "dealers.Dealer", on_delete=models.CASCADE, related_name="daily_metrics"
    )
    date = models.DateField()

    # Listing counts
    total_listings = models.PositiveIntegerField(default=0)
    new_listings = models.PositiveIntegerField(default=0)
    sold_listings = models.PositiveIntegerField(default=0)
    active_listings = models.PositiveIntegerField(default=0)

    # Performance metrics
    avg_price = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    median_price = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    avg_age_days = models.FloatField(default=0.0)

    # Engagement (future tracking)
    views = models.PositiveIntegerField(default=0)
    leads = models.PositiveIntegerField(default=0)

    # Derived / composite metrics
    sell_through_rate = models.FloatField(default=0.0, help_text="sold_listings / active_listings")
    health_score = models.FloatField(
        default=0.0,
        help_text="Composite performance metric combining sales velocity, engagement, and price realism.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("dealer", "date")
        ordering = ["-date"]
        indexes = [
            models.Index(fields=["dealer", "date"]),
            models.Index(fields=["date"]),
        ]
        verbose_name = "Dealer Daily Metric"
        verbose_name_plural = "Dealer Daily Metrics"

    def __str__(self):
        return f"{self.dealer.name} ({self.date})"

    @property
    def sell_through_display(self):
        if self.active_listings > 0:
            return round((self.sold_listings / self.active_listings) * 100, 2)
        return 0.0

    def compute_health_score(self):
        """Example formula for computing a performance health score."""
        weight_sales = 0.5
        weight_engagement = 0.3
        weight_inventory = 0.2

        sales_factor = min(self.sell_through_display / 100, 1)
        engagement_factor = min((self.views + self.leads) / 1000, 1)
        inventory_factor = 1 - min(self.avg_age_days / 90, 1)

        self.health_score = round(
            (weight_sales * sales_factor)
            + (weight_engagement * engagement_factor)
            + (weight_inventory * inventory_factor),
            2,
        )
        return self.health_score