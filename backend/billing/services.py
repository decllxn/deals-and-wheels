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

# PayPal provider import
from .payments.paypal_provider import create_paypal_payment, execute_paypal_payment

logger = logging.getLogger(__name__)


# =========================================================
# SUBSCRIPTION SERVICES
# =========================================================

def create_subscription(user, plan, provider="sandbox"):
    """
    Create a new subscription for a user.
    Handles trial and immediate activation.
    """
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
            logger.info(f"🎯 Trial started for subscription {sub.id}")
        else:
            _activate_subscription(sub)

        return sub


def cancel_subscription(subscription, at_period_end=True):
    """
    Cancel a subscription (either immediately or at the end of the billing period).
    """
    logger.info(f"Canceling subscription {subscription.id} (at_period_end={at_period_end})")
    subscription.cancel(at_period_end=at_period_end)
    return subscription


def renew_subscription(subscription):
    """
    Extend a subscription by its plan interval.
    """
    if subscription.status != Subscription.STATUS_ACTIVE:
        logger.warning(f"Skipping renewal: subscription {subscription.id} not active.")
        return None

    logger.info(f"🔁 Renewing subscription {subscription.id}...")
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

    logger.info(f"✅ Subscription {subscription.id} renewed until {next_end}")
    return subscription


def _activate_subscription(subscription):
    """
    Internal helper to set active period and mark as active.
    """
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
    logger.info(f"✅ Subscription {subscription.id} activated until {end}")
    return subscription


# =========================================================
# INVOICE SERVICES
# =========================================================

def generate_invoice(subscription, amount=None, currency=None):
    """
    Create an invoice for a subscription.
    """
    amount = amount or subscription.plan.price
    currency = currency or subscription.plan.currency

    invoice = Invoice.objects.create(
        subscription=subscription,
        amount=amount,
        currency=currency,
        provider_invoice_id=f"INV-{subscription.pk}-{int(timezone.now().timestamp())}",
        paid=False,
    )
    logger.info(f"🧾 Invoice #{invoice.id} generated for subscription {subscription.id}")
    return invoice


def mark_invoice_paid(invoice, provider_payment_id=None):
    """
    Mark invoice as paid.
    """
    invoice.paid = True
    invoice.paid_at = timezone.now()
    if provider_payment_id:
        invoice.provider_invoice_id = provider_payment_id
    invoice.save(update_fields=["paid", "paid_at", "provider_invoice_id"])
    logger.info(f"✅ Invoice #{invoice.id} marked as paid.")
    return invoice


# =========================================================
# PAYMENT TRANSACTION SERVICES
# =========================================================

def simulate_payment(subscription):
    """
    Simulate a successful payment in sandbox mode.
    """
    logger.info(f"Simulating payment for subscription {subscription.id}")
    tx = PaymentTransaction.objects.create(
        subscription=subscription,
        amount=subscription.plan.price,
        currency=subscription.plan.currency,
        provider=subscription.provider or "sandbox",
        provider_payment_id=f"SIM-{subscription.id}-{int(timezone.now().timestamp())}",
        status=PaymentTransaction.STATUS_SUCCESS,
        created_at=timezone.now(),
    )
    process_payment_success(tx)
    return tx


def process_payment_success(transaction):
    """
    Handle payment success → mark transaction + generate and mark invoice paid + renew subscription.
    """
    logger.info(f"✅ Processing successful payment transaction {transaction.id}")
    with transaction.atomic():
        transaction.mark_success(provider_payment_id=f"PAY-{transaction.pk}-{int(timezone.now().timestamp())}")

        invoice = generate_invoice(
            subscription=transaction.subscription,
            amount=transaction.amount,
            currency=transaction.currency,
        )
        mark_invoice_paid(invoice, transaction.provider_payment_id)

        renew_subscription(transaction.subscription)

        logger.info(f"🎉 Payment success handled for subscription {transaction.subscription.id}")
        return invoice


def process_payment_failure(transaction, reason="Payment failed"):
    """
    Handle a failed payment attempt.
    """
    logger.warning(f"⚠️ Payment failed for transaction {transaction.id}: {reason}")
    transaction.mark_failed(reason)
    return transaction


# =========================================================
# PAYPAL PAYMENT SERVICES
# =========================================================

def initiate_paypal_payment(subscription, request):
    """
    Create a PayPal payment and return the approval URL.
    """
    logger.info(f"💰 Initiating PayPal payment for subscription {subscription.id}")
    
    amount = subscription.plan.price
    return_url = request.build_absolute_uri("/api/billing/paypal/execute/")
    cancel_url = request.build_absolute_uri("/api/billing/paypal/cancel/")

    approval_url, payment_id = create_paypal_payment(amount, return_url, cancel_url)
    
    # Record a pending transaction
    tx = PaymentTransaction.objects.create(
        subscription=subscription,
        amount=amount,
        currency=subscription.plan.currency,
        provider="paypal",
        provider_payment_id=payment_id,
        status=PaymentTransaction.STATUS_PENDING,
        created_at=timezone.now(),
    )
    
    logger.info(f"🧾 PayPal transaction {tx.id} created for subscription {subscription.id}")
    return approval_url, tx


def finalize_paypal_payment(payment_id, payer_id):
    """
    Execute a PayPal payment after user approval.
    """
    logger.info(f"⚙️ Finalizing PayPal payment: {payment_id}")
    
    payment = execute_paypal_payment(payment_id, payer_id)
    tx = PaymentTransaction.objects.filter(provider_payment_id=payment_id).first()
    
    if not tx:
        logger.warning(f"⚠️ No transaction found for PayPal payment {payment_id}")
        return None

    if payment.state == "approved":
        tx.status = PaymentTransaction.STATUS_SUCCESS
        tx.save(update_fields=["status"])
        process_payment_success(tx)
    else:
        tx.status = PaymentTransaction.STATUS_FAILED
        tx.save(update_fields=["status"])
        process_payment_failure(tx, reason="PayPal payment not approved")

    return tx


# =========================================================
# PROVIDER SYNC & STATUS
# =========================================================

def sync_subscription_with_provider(subscription):
    """
    Simulate syncing subscription with external payment provider.
    """
    logger.info(f"🔄 Syncing subscription {subscription.id} with provider {subscription.provider}...")

    try:
        provider_status = "active"  # Sandbox simulation
        if provider_status == "active":
            subscription.status = Subscription.STATUS_ACTIVE
        elif provider_status == "canceled":
            subscription.status = Subscription.STATUS_CANCELED
        else:
            subscription.status = Subscription.STATUS_EXPIRED

        subscription.save(update_fields=["status"])
        logger.info(f"✅ Subscription {subscription.id} synced → {subscription.status}")
        return subscription.status

    except Exception as e:
        logger.exception(f"❌ Error syncing subscription {subscription.id}: {e}")
        return subscription.status