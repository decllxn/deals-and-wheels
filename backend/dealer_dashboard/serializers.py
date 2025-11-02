# dealer_dashboard/serializers.py
from datetime import timedelta
from django.utils import timezone
from rest_framework import serializers

from .models import DealerDailyMetrics
from dealers.serializers import DealerSerializer


class DealerDailyMetricsSerializer(serializers.ModelSerializer):
    """Serialize daily metrics for time-series data and trend charts."""

    sell_through_display = serializers.FloatField(read_only=True)

    class Meta:
        model = DealerDailyMetrics
        fields = [
            "date",
            "total_listings",
            "new_listings",
            "sold_listings",
            "active_listings",
            "avg_price",
            "avg_age_days",
            "views",
            "leads",
            "sell_through_display",
            "health_score",
        ]


class DealerOverviewSerializer(serializers.Serializer):
    """
    Summarizes dealer performance for dashboard.
    Provides today's KPIs and last 30 days trend data.
    """

    today = serializers.SerializerMethodField()
    last_30_days = serializers.SerializerMethodField()

    def get_today(self, dealer):
        """Return today's snapshot metrics for a dealer."""
        today = timezone.now().date()
        metric = (
            DealerDailyMetrics.objects.filter(dealer=dealer, date=today)
            .order_by("-date")
            .first()
        )

        if not metric:
            return {
                "total_listings": 0,
                "new_listings": 0,
                "sold_listings": 0,
                "active_listings": 0,
                "avg_price": 0,
                "avg_age_days": 0,
                "sell_through_display": 0,
                "health_score": 0,
            }

        return DealerDailyMetricsSerializer(metric).data

    def get_last_30_days(self, dealer):
        """Return last 30 days of metrics for trend charts."""
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        metrics = (
            DealerDailyMetrics.objects.filter(
                dealer=dealer, date__range=(start_date, end_date)
            )
            .order_by("date")
        )
        return DealerDailyMetricsSerializer(metrics, many=True).data


class DealerDashboardSerializer(serializers.Serializer):
    """
    Aggregated dashboard view for a single dealer.
    Combines dealer info, KPI snapshot, charts, and summary cards.
    """

    dealer = DealerSerializer(read_only=True)
    overview = serializers.SerializerMethodField()
    metrics_trend = serializers.SerializerMethodField()
    summary_cards = serializers.SerializerMethodField()

    def get_overview(self, dealer):
        """Top-level metrics shown in dashboard cards (today's KPIs)."""
        today_data = DealerOverviewSerializer().get_today(dealer)
        return {
            "health_score": today_data.get("health_score", 0),
            "active_listings": today_data.get("active_listings", 0),
            "sold_today": today_data.get("sold_listings", 0),
            "new_today": today_data.get("new_listings", 0),
            "sell_through": today_data.get("sell_through_display", 0),
        }

    def get_metrics_trend(self, dealer):
        """30-day metrics trend for charts."""
        data = DealerOverviewSerializer().get_last_30_days(dealer)
        return {
            "dates": [item["date"] for item in data],
            "health_scores": [item["health_score"] for item in data],
            "sell_through": [item["sell_through_display"] for item in data],
            "avg_prices": [float(item["avg_price"] or 0) for item in data],
        }

    def get_summary_cards(self, dealer):
        """Summary aggregates for the last 30 days."""
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        qs = DealerDailyMetrics.objects.filter(
            dealer=dealer, date__range=(start_date, end_date)
        )

        count = qs.count() or 1
        return {
            "total_sold": sum(q.sold_listings for q in qs),
            "total_new": sum(q.new_listings for q in qs),
            "average_health": round(sum(q.health_score for q in qs) / count, 2),
            "average_sell_through": round(
                sum(q.sell_through_display for q in qs) / count, 2
            ),
        }