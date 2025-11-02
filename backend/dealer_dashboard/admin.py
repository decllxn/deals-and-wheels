# dealer_dashboard/admin.py
from django.contrib import admin
from django.db.models import Avg, Sum
from django.utils.html import format_html
import matplotlib.pyplot as plt
from io import BytesIO
import base64

from unfold.admin import ModelAdmin as UnfoldAdmin

from .models import DealerDailyMetrics, ListingEvent
from django_celery_results.models import TaskResult
from django_celery_beat.models import PeriodicTask, IntervalSchedule, CrontabSchedule


for model in [TaskResult, PeriodicTask, IntervalSchedule, CrontabSchedule]:
    try:
        admin.site.unregister(model)
    except admin.sites.NotRegistered:
        pass

# =========================================================
# 🔹 DealerDailyMetrics Admin
# =========================================================
@admin.register(DealerDailyMetrics)
class DealerDailyMetricsAdmin(UnfoldAdmin):
    list_display = (
        "dealer",
        "date",
        "active_listings",
        "sold_listings",
        "sell_through_display",
        "avg_price",
        "health_score",
        "views",
        "leads",
    )
    list_filter = ("dealer", "date")
    search_fields = ("dealer__name",)
    ordering = ("-date",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        ("Dealer Info", {"fields": ("dealer", "date")}),
        (
            "Listings Summary",
            {"fields": ("total_listings", "new_listings", "sold_listings", "active_listings")},
        ),
        (
            "Performance",
            {"fields": ("avg_price", "median_price", "avg_age_days", "sell_through_rate", "health_score")},
        ),
        (
            "Engagement",
            {"fields": ("views", "leads")},
        ),
        (
            "Timestamps",
            {"classes": ("collapse",), "fields": ("created_at", "updated_at")},
        ),
        (
            "📊 Quick Chart",
            {"fields": ("performance_chart",)},
        ),
    )

    def performance_chart(self, obj):
        """Generate a mini embedded line chart showing daily sales trends."""
        metrics = (
            DealerDailyMetrics.objects.filter(dealer=obj.dealer)
            .order_by("date")
            .values_list("date", "sell_through_rate", "health_score")
        )
        if not metrics:
            return "(No data)"

        dates, sell_through, health = zip(*metrics)

        plt.figure(figsize=(5, 2))
        plt.plot(dates, sell_through, label="Sell Through %", linewidth=2)
        plt.plot(dates, health, label="Health Score", linewidth=2)
        plt.legend(fontsize=6)
        plt.xticks(rotation=45, fontsize=6)
        plt.tight_layout()

        buffer = BytesIO()
        plt.savefig(buffer, format="png")
        plt.close()
        encoded = base64.b64encode(buffer.getvalue()).decode()
        return format_html('<img src="data:image/png;base64,{}" style="max-width: 100%;" />', encoded)

    performance_chart.short_description = "Performance Trends"


# =========================================================
# 🔹 ListingEvent Admin
# =========================================================
@admin.register(ListingEvent)
class ListingEventAdmin(UnfoldAdmin):
    list_display = ("dealer", "listing", "event_type", "created_at", "metadata_summary")
    list_filter = ("event_type", "dealer", "created_at")
    search_fields = ("dealer__name", "listing__title", "event_type")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)
    list_per_page = 25

    def metadata_summary(self, obj):
        if not obj.metadata:
            return "-"
        text = ", ".join(f"{k}: {v}" for k, v in obj.metadata.items())
        return text[:80] + ("..." if len(text) > 80 else "")
    metadata_summary.short_description = "Metadata"


# =========================================================
# 🔹 Celery Task Results Admin
# =========================================================
@admin.register(TaskResult)
class TaskResultAdmin(UnfoldAdmin):
    list_display = (
        "task_name",
        "status",
        "date_done",
        "runtime_display",
        "worker",
    )
    list_filter = ("status", "date_done")
    search_fields = ("task_name", "task_id")
    ordering = ("-date_done",)
    readonly_fields = ("result", "traceback", "meta")

    def runtime_display(self, obj):
        if obj.date_done and obj.date_created:
            delta = obj.date_done - obj.date_created
            return f"{delta.total_seconds():.2f}s"
        return "-"
    runtime_display.short_description = "Runtime"


# =========================================================
# 🔹 Celery Periodic Task Admin
# =========================================================
@admin.register(PeriodicTask)
class PeriodicTaskAdmin(UnfoldAdmin):
    list_display = ("name", "task", "enabled", "interval", "last_run_at", "total_run_count")
    list_filter = ("enabled",)
    search_fields = ("name", "task")
    ordering = ("name",)


# =========================================================
# 🔹 Celery Schedule Models Admin
# =========================================================
@admin.register(IntervalSchedule)
class IntervalScheduleAdmin(UnfoldAdmin):
    list_display = ("every", "period")
    ordering = ("period",)


@admin.register(CrontabSchedule)
class CrontabScheduleAdmin(UnfoldAdmin):
    list_display = ("minute", "hour", "day_of_week", "day_of_month", "month_of_year")