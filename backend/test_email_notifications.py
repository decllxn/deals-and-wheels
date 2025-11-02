import os
import django

# ✅ Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from django.utils import timezone
from billing.models import Plan, Subscription, PaymentTransaction, Invoice
from billing.notifications import (
    send_payment_success_email,
    send_payment_failed_email,
    send_invoice_generated_email,
    send_subscription_cancelled_email,
)

User = get_user_model()


# ==========================================================
# 1️⃣ Helper: create or get a test user + mock data
# ==========================================================
def create_test_data():
    user = User.objects.filter(email="testdealer10@gmail.com").first()
    if not user:
        user = User.objects.create_user(
            username="testdealer10",
            email="testdealer10@gmail.com",
            password="testpass123"
        )
        print(f"✅ Created test user: {user.email}")
    else:
        print(f"👤 Using existing user: {user.email}")

    # ✅ Create or get a mock plan
    plan, _ = Plan.objects.get_or_create(
        slug="pro-monthly",
        defaults={
            "name": "Pro Monthly",
            "price": 1000,
            "currency": "KES",
            "interval": Plan.INTERVAL_MONTH,
            "trial_days": 7,
            "description": "Professional plan with premium features",
        },
    )

    # ✅ Create a fake subscription
    subscription = Subscription.objects.create(
        user=user,
        plan=plan,
        provider="mpesa",  # Avoid NoneType issues
        status=Subscription.STATUS_ACTIVE,
        current_period_start=timezone.now(),
        current_period_end=timezone.now() + timezone.timedelta(days=30),
    )

    # ✅ Create a mock payment transaction
    txn = PaymentTransaction.objects.create(
        user=user,
        subscription=subscription,
        provider="mpesa",
        provider_payment_id="TEST-MPESA-001",
        amount=1000,
        currency="KES",
        status=PaymentTransaction.STATUS_SUCCESS,
        metadata={"note": "Simulated test payment"},
    )

    # ✅ Create a mock invoice
    invoice = Invoice.objects.create(
        subscription=subscription,
        amount=txn.amount,
        currency=txn.currency,
        provider_invoice_id="INV-TEST-001",
        paid=False,
    )

    return user, txn, subscription, invoice


# ==========================================================
# 2️⃣ Main: trigger email tests
# ==========================================================
def main():
    print("🚀 Starting test of payment email notifications...\n")

    user, txn, subscription, invoice = create_test_data()

    print("📤 Sending test: payment_success_email ...")
    send_payment_success_email(user, txn)

    print("📤 Sending test: payment_failed_email ...")
    send_payment_failed_email(user, txn)

    print("📤 Sending test: invoice_generated_email ...")
    send_invoice_generated_email(user, invoice)

    print("📤 Sending test: subscription_cancelled_email ...")
    send_subscription_cancelled_email(user, subscription)

    print("\n✅ All test emails triggered successfully! Check your console for output.")


if __name__ == "__main__":
    main()