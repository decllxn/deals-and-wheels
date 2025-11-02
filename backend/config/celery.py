# backend/config/celery.py
import os
from celery import Celery
from celery.schedules import crontab

# Default Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

app = Celery("config")

# Load settings from Django settings, prefixed with CELERY_
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks across all Django apps
app.autodiscover_tasks()

# Optional: define scheduled jobs
app.conf.beat_schedule = {
    "compute_daily_dealer_metrics": {
        "task": "dealer_dashboard.tasks.compute_daily_metrics_for_date",
        "schedule": crontab(hour=0, minute=5),
    },
}