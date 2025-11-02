"""
billing/tasks.py
-----------------
Celery tasks for handling recurring billing, payment retries, subscription syncing,
and monthly invoice generation.
"""

from celery import shared_task
from django.utils import timezone
import logging

from .models import Subscription, PaymentTransaction
from .services import (
    process_payment_success,
    process_payment_failure,
    generate_invoice,
    renew_subscription,
)

logger = logging.getLogger(__name__)


# ==========================================================
# 🧾 1. Generate Monthly Invoices
# ==========================================================
@shared_task
def generate_monthly_invoices():
    """
    🧾 Generate invoices for all active subscriptions at the start of each billing period.
    """
    logger.info("🧾 Starting monthly invoice generation...")
    now = timezone.now()

    subscriptions = Subscription.objects.filter(status=Subscription.STATUS_ACTIVE)

    if not subscriptions.exists():
        logger.info("✅ No active subscriptions found for invoicing.")
        return

    for sub in subscriptions:
        try:
            invoice = generate_invoice(sub)
            logger.info(f"✅ Invoice {invoice.id} generated for subscription {sub.id}.")
        except Exception as e:
            logger.exception(f"❌ Failed to generate invoice for subscription {sub.id}: {e}")

    logger.info("🏁 Monthly invoice generation completed.")


# ==========================================================
# 🔁 2. Process Recurring Payments
# ==========================================================
@shared_task
def process_recurring_payments():
    """
    🔁 Automatically renew and bill active subscriptions whose period has ended.
    """
    logger.info("🔁 Starting recurring subscription payment processing...")
    now = timezone.now()

    subscriptions = Subscription.objects.filter(
        status=Subscription.STATUS_ACTIVE,
        current_period_end__lte=now
    )

    if not subscriptions.exists():
        logger.info("✅ No subscriptions due for renewal.")
        return

    for sub in subscriptions:
        logger.info(f"Processing renewal for subscription {sub.id}")

        try:
            tx = PaymentTransaction.objects.create(
                subscription=sub,
                amount=sub.plan.price,
                currency=sub.plan.currency,
                provider=sub.provider or "sandbox",
                status=PaymentTransaction.STATUS_PENDING,
            )

            # Simulate sandbox success
            process_payment_success(tx)
            logger.info(f"✅ Subscription {sub.id} renewed successfully.")
        except Exception as e:
            logger.exception(f"❌ Failed renewal for subscription {sub.id}: {e}")
            if 'tx' in locals():
                process_payment_failure(tx, str(e))


# ==========================================================
# 🔄 3. Sync Subscription Statuses
# ==========================================================
@shared_task
def sync_subscription_statuses():
    """
    🔄 Check for expired subscriptions and mark them as expired.
    """
    logger.info("🔄 Syncing subscription statuses...")
    now = timezone.now()

    expired_subs = Subscription.objects.filter(
        status=Subscription.STATUS_ACTIVE,
        current_period_end__lt=now
    )

    for sub in expired_subs:
        sub.status = Subscription.STATUS_EXPIRED
        sub.save(update_fields=["status"])
        logger.info(f"⚠️ Subscription {sub.id} marked as expired.")


# ==========================================================
# 💰 4. Retry Failed Payments
# ==========================================================
@shared_task
def retry_failed_payments():
    """
    💰 Retry previously failed payments automatically.
    """
    logger.info("💰 Retrying failed payments...")
    failed_txs = PaymentTransaction.objects.filter(
        status=PaymentTransaction.STATUS_FAILED
    )

    if not failed_txs.exists():
        logger.info("✅ No failed payments to retry.")
        return

    for tx in failed_txs:
        try:
            process_payment_success(tx)
            logger.info(f"✅ Retried payment succeeded for transaction {tx.id}")
        except Exception as e:
            logger.exception(f"❌ Retry failed for transaction {tx.id}: {e}")
            process_payment_failure(tx, str(e))