"""
billing/notifications.py
------------------------
Handles all billing-related notifications (emails, alerts).
Uses both text and HTML templates with proper context formatting.
Compatible with Celery background tasks.
"""

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone

from .models import Subscription, Invoice, PaymentTransaction
from .utils import format_amount, period_string


DEFAULT_FROM = getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@yourapp.com")


# =========================================================
# 🔧 HELPER: send email with HTML + text fallback
# =========================================================

def _send_email(subject: str, template_base: str, context: dict, to_email: str):
    """
    Send an email with both HTML and plain-text versions.
    Expects templates in billing/emails/<template_base>.html|.txt
    """
    text_body = render_to_string(f"billing/emails/{template_base}.txt", context)
    html_body = render_to_string(f"billing/emails/{template_base}.html", context)

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_body,
        from_email=DEFAULT_FROM,
        to=[to_email],
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send()


# =========================================================
# 💰 PAYMENT NOTIFICATIONS
# =========================================================

def send_payment_success_email(user, transaction: PaymentTransaction, invoice: Invoice = None):
    """
    Notify the user of a successful payment.
    """
    sub = transaction.subscription
    context = {
        "user": user,
        "transaction": transaction,
        "invoice": invoice,
        "amount": format_amount(transaction.amount, transaction.currency),
        "period": (
            period_string(sub.current_period_start, sub.current_period_end)
            if sub else None
        ),
        "timestamp": timezone.now(),
    }

    subject = f"✅ Payment Successful — {context['amount']}"
    _send_email(subject, "payment_success", context, user.email)


def send_payment_failed_email(user, transaction: PaymentTransaction, reason: str = "Payment failed"):
    """
    Notify the user of a failed payment attempt.
    """
    context = {
        "user": user,
        "transaction": transaction,
        "reason": reason,
        "amount": format_amount(transaction.amount, transaction.currency),
        "timestamp": timezone.now(),
    }

    subject = f"❌ Payment Failed — {context['amount']}"
    _send_email(subject, "payment_failed", context, user.email)


# =========================================================
# 🧾 INVOICE NOTIFICATIONS
# =========================================================

def send_invoice_generated_email(user, invoice: Invoice):
    """
    Notify the user when a new invoice is generated.
    """
    context = {
        "user": user,
        "invoice": invoice,
        "amount": format_amount(invoice.amount, invoice.currency),
        "invoice_id": invoice.provider_invoice_id,
        "timestamp": invoice.created_at or timezone.now(),
    }

    subject = f"🧾 Invoice #{invoice.provider_invoice_id} Generated"
    _send_email(subject, "invoice_generated", context, user.email)


# =========================================================
# ⚠️ SUBSCRIPTION NOTIFICATIONS
# =========================================================

def send_subscription_cancelled_email(user, subscription: Subscription):
    """
    Notify the user when a subscription is cancelled.
    """
    context = {
        "user": user,
        "subscription": subscription,
        "plan_name": subscription.plan.name,
        "cancel_at": subscription.cancel_at,
        "timestamp": timezone.now(),
    }

    subject = f"⚠️ Subscription Cancelled — {subscription.plan.name}"
    _send_email(subject, "subscription_cancelled", context, user.email)