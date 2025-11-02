# billing/signals.py
import logging
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils import timezone

from .models import BillingCustomer, Subscription
from . import services
from dealer.models import Dealer

User = get_user_model()
logger = logging.getLogger(__name__)


# =========================================================
# 1️⃣ AUTO-CREATE BILLING CUSTOMER ON USER CREATION
# =========================================================

@receiver(post_save, sender=User)
def create_billing_customer_for_user(sender, instance, created, **kwargs):
    """
    Automatically create a BillingCustomer record when a new User is registered.
    This ensures every user (especially dealers) has a billing profile.
    """
    if created:
        BillingCustomer.objects.get_or_create(user=instance)
        logger.info(f"💳 BillingCustomer created for new user {instance.email}")


# =========================================================
# 2️⃣ AUTO-CANCEL SUBSCRIPTIONS ON USER DELETE
# =========================================================

@receiver(pre_delete, sender=User)
def cancel_user_subscriptions_on_delete(sender, instance, **kwargs):
    """
    When a user is deleted, automatically cancel all their active subscriptions.
    """
    user_subs = Subscription.objects.filter(user=instance, status=Subscription.STATUS_ACTIVE)
    for sub in user_subs:
        try:
            services.cancel_subscription(sub, at_period_end=False)
            logger.info(f"⛔ Subscription {sub.id} cancelled for deleted user {instance.email}")
        except Exception as exc:
            logger.error(f"⚠️ Failed to cancel subscription {sub.id} for {instance.email}: {exc}")


# =========================================================
# 3️⃣ OPTIONAL (If Dealers auto-create Users)
# =========================================================
# If your Dealer model is created *after* a User (via onboarding),
# you could also ensure the Dealer's BillingCustomer exists (safety net):


@receiver(post_save, sender=Dealer)
def ensure_billing_customer_for_dealer(sender, instance, created, **kwargs):
    """
    Ensure that the Dealer's linked user has a BillingCustomer (safety check).
    """
    if created:
        BillingCustomer.objects.get_or_create(user=instance.user)
        logger.info(f"🏢 Dealer {instance.name} linked to BillingCustomer for {instance.user.email}")