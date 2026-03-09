"""
billing/tasks.py
-----------------
Celery tasks for recurring billing and maintenance.
"""

from celery import shared_task
from django.utils import timezone
import logging

from .models import Subscription, PaymentTransaction
from .services import (
    process_payment_success,
    process_payment_failure,
    generate_invoice,
)

logger = logging.getLogger(__name__)


# ==========================================================
# 🧾 Generate Monthly Invoices
# ==========================================================
@shared_task
def generate_monthly_invoices():
    subscriptions = Subscription.objects.filter(status=Subscription.STATUS_ACTIVE)

    for sub in subscriptions:
        try:
            generate_invoice(sub)
        except Exception:
            logger.exception(f"Invoice generation failed for subscription {sub.id}")


# ==========================================================
# 🔁 Process Recurring Payments
# ==========================================================
@shared_task
def process_recurring_payments():
    now = timezone.now()

    subscriptions = Subscription.objects.filter(
        status=Subscription.STATUS_ACTIVE,
        current_period_end__lte=now
    )

    for sub in subscriptions:
        logger.info(f"Processing renewal for subscription {sub.id}")

        if not sub.user:
            logger.error(f"Subscription {sub.id} has no user")
            continue

        try:
            tx = PaymentTransaction.objects.create(
                user=sub.user,                 # ✅ FIX
                subscription=sub,
                amount=sub.plan.price,
                currency=sub.plan.currency,
                provider=sub.provider or "sandbox",
                status=PaymentTransaction.STATUS_PENDING,
            )

            process_payment_success(tx)

        except Exception as e:
            logger.exception(f"❌ Failed renewal for subscription {sub.id}: {e}")
            if 'tx' in locals():
                process_payment_failure(tx, str(e))


# ==========================================================
# 🔄 Sync Subscription Statuses
# ==========================================================
@shared_task
def sync_subscription_statuses():
    now = timezone.now()

    expired_subs = Subscription.objects.filter(
        status=Subscription.STATUS_ACTIVE,
        current_period_end__lt=now
    )

    for sub in expired_subs:
        sub.status = Subscription.STATUS_CANCELLED  # ✅ SAFE
        sub.save(update_fields=["status"])
        logger.info(f"Subscription {sub.id} expired")


# ==========================================================
# 💰 Retry Failed Payments
# ==========================================================
@shared_task
def retry_failed_payments():
    failed_txs = PaymentTransaction.objects.filter(
        status=PaymentTransaction.STATUS_FAILED
    )

    for tx in failed_txs:
        try:
            process_payment_success(tx)
        except Exception as e:
            process_payment_failure(tx, str(e))