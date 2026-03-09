"""
billing/services.py
--------------------
Core service functions for billing, subscription, and payment handling.
Used by Celery tasks, views, and webhooks.
"""

import logging
from django.db import transaction
from django.utils import timezone
from .models import Plan, Subscription, Invoice, PaymentTransaction

from .payments.paypal_provider import create_paypal_payment, execute_paypal_payment

logger = logging.getLogger(__name__)


# =========================================================
# SUBSCRIPTION SERVICES
# =========================================================

def create_subscription(user, plan, provider="sandbox"):
    logger.info(f"Creating subscription for user={user.id} plan={plan.name}")

    with transaction.atomic():
        sub = Subscription.objects.create(
            user=user,
            plan=plan,
            provider=provider,
            status=Subscription.STATUS_PENDING,
        )

        if plan.trial_days > 0:
            sub.start_trial()
        else:
            _activate_subscription(sub)

        return sub


def cancel_subscription(subscription, at_period_end=True):
    logger.info(f"Canceling subscription {subscription.id}")
    subscription.cancel(at_period_end=at_period_end)
    return subscription


def renew_subscription(subscription):
    if subscription.status != Subscription.STATUS_ACTIVE:
        logger.warning(f"Skipping renewal: subscription {subscription.id} not active.")
        return None

    now = timezone.now()

    if subscription.plan.interval == Plan.INTERVAL_MONTH:
        next_end = now + timezone.timedelta(days=30)
    elif subscription.plan.interval == Plan.INTERVAL_YEAR:
        next_end = now + timezone.timedelta(days=365)
    else:
        next_end = now

    subscription.current_period_start = now
    subscription.current_period_end = next_end
    subscription.save(update_fields=["current_period_start", "current_period_end"])
    return subscription


def _activate_subscription(subscription):
    now = timezone.now()

    if subscription.plan.interval == Plan.INTERVAL_MONTH:
        end = now + timezone.timedelta(days=30)
    elif subscription.plan.interval == Plan.INTERVAL_YEAR:
        end = now + timezone.timedelta(days=365)
    else:
        end = now

    subscription.current_period_start = now
    subscription.current_period_end = end
    subscription.status = Subscription.STATUS_ACTIVE
    subscription.save(update_fields=["current_period_start", "current_period_end", "status"])
    return subscription


# =========================================================
# INVOICE SERVICES
# =========================================================

def generate_invoice(subscription, amount=None, currency=None):
    amount = amount or subscription.plan.price
    currency = currency or subscription.plan.currency

    return Invoice.objects.create(
        subscription=subscription,
        amount=amount,
        currency=currency,
        provider_invoice_id=f"INV-{subscription.pk}-{int(timezone.now().timestamp())}",
        paid=False,
    )


def mark_invoice_paid(invoice, provider_payment_id=None):
    invoice.paid = True
    invoice.paid_at = timezone.now()
    if provider_payment_id:
        invoice.provider_invoice_id = provider_payment_id
    invoice.save(update_fields=["paid", "paid_at", "provider_invoice_id"])
    return invoice


# =========================================================
# PAYMENT TRANSACTION SERVICES
# =========================================================

def simulate_payment(subscription):
    tx = PaymentTransaction.objects.create(
        user=subscription.user,  # ✅ FIX
        subscription=subscription,
        amount=subscription.plan.price,
        currency=subscription.plan.currency,
        provider=subscription.provider or "sandbox",
        provider_payment_id=f"SIM-{subscription.id}-{int(timezone.now().timestamp())}",
        status=PaymentTransaction.STATUS_SUCCESS,
    )
    process_payment_success(tx)
    return tx


def process_payment_success(transaction):
    with transaction.atomic():
        transaction.mark_success(
            provider_payment_id=f"PAY-{transaction.pk}-{int(timezone.now().timestamp())}"
        )

        invoice = generate_invoice(
            subscription=transaction.subscription,
            amount=transaction.amount,
            currency=transaction.currency,
        )
        mark_invoice_paid(invoice, transaction.provider_payment_id)
        renew_subscription(transaction.subscription)

        return invoice


def process_payment_failure(transaction, reason="Payment failed"):
    transaction.mark_failed(reason)
    return transaction


# =========================================================
# PAYPAL SERVICES
# =========================================================

def initiate_paypal_payment(subscription, request):
    amount = subscription.plan.price
    return_url = request.build_absolute_uri("/api/billing/paypal/execute/")
    cancel_url = request.build_absolute_uri("/api/billing/paypal/cancel/")

    approval_url, payment_id = create_paypal_payment(amount, return_url, cancel_url)

    tx = PaymentTransaction.objects.create(
        user=subscription.user,  # ✅ FIX
        subscription=subscription,
        amount=amount,
        currency=subscription.plan.currency,
        provider="paypal",
        provider_payment_id=payment_id,
        status=PaymentTransaction.STATUS_PENDING,
    )

    return approval_url, tx


def finalize_paypal_payment(payment_id, payer_id):
    payment = execute_paypal_payment(payment_id, payer_id)
    tx = PaymentTransaction.objects.filter(provider_payment_id=payment_id).first()

    if not tx:
        return None

    if payment.state == "approved":
        tx.status = PaymentTransaction.STATUS_SUCCESS
        tx.save(update_fields=["status"])
        process_payment_success(tx)
    else:
        process_payment_failure(tx, "PayPal payment not approved")

    return tx


# =========================================================
# PROVIDER SYNC
# =========================================================

def sync_subscription_with_provider(subscription):
    provider_status = "active"  # sandbox simulation

    if provider_status == "active":
        subscription.status = Subscription.STATUS_ACTIVE
    elif provider_status == "canceled":
        subscription.status = Subscription.STATUS_CANCELLED
    else:
        subscription.status = Subscription.STATUS_CANCELLED  # safe fallback

    subscription.save(update_fields=["status"])
    return subscription.status