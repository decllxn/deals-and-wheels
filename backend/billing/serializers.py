# billing/serializers.py
from rest_framework import serializers
from .models import (
    Plan,
    BillingCustomer,
    Subscription,
    Invoice,
    PaymentTransaction,
)


# -----------------------------
# PLAN SERIALIZER
# -----------------------------
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            "id",
            "slug",
            "name",
            "price",
            "currency",
            "interval",
            "trial_days",
            "description",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


# -----------------------------
# BILLING CUSTOMER SERIALIZER
# -----------------------------
class BillingCustomerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = BillingCustomer
        fields = [
            "id",
            "user",
            "provider_customer_id",
            "default_payment_method",
            "metadata",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "user"]


# -----------------------------
# SUBSCRIPTION SERIALIZER
# -----------------------------
class SubscriptionSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True)
    plan_id = serializers.PrimaryKeyRelatedField(
        queryset=Plan.objects.all(),
        source="plan",
        write_only=True,
        required=True
    )

    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Subscription
        fields = [
            "id",
            "user",
            "plan",
            "plan_id",
            "provider",
            "provider_subscription_id",
            "status",
            "status_display",
            "current_period_start",
            "current_period_end",
            "cancel_at",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "provider_subscription_id",
            "created_at",
            "updated_at",
            "current_period_start",
            "current_period_end",
            "cancel_at",
        ]

    def create(self, validated_data):
        """
        Attach authenticated user automatically if passed in context.
        """
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)


# -----------------------------
# INVOICE SERIALIZER
# -----------------------------
class InvoiceSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer(read_only=True)
    subscription_id = serializers.PrimaryKeyRelatedField(
        queryset=Subscription.objects.all(),
        source="subscription",
        write_only=True,
        required=False
    )

    class Meta:
        model = Invoice
        fields = [
            "id",
            "subscription",
            "subscription_id",
            "amount",
            "currency",
            "provider_invoice_id",
            "paid",
            "metadata",
            "created_at",
            "paid_at",
        ]
        read_only_fields = ["id", "paid", "created_at", "paid_at"]


# -----------------------------
# PAYMENT TRANSACTION SERIALIZER
# -----------------------------
class PaymentTransactionSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer(read_only=True)
    subscription_id = serializers.PrimaryKeyRelatedField(
        queryset=Subscription.objects.all(),
        source="subscription",
        write_only=True,
        required=False
    )

    user = serializers.StringRelatedField(read_only=True)
    provider_display = serializers.CharField(source="get_provider_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = PaymentTransaction
        fields = [
            "id",
            "subscription",
            "subscription_id",
            "user",
            "provider",
            "provider_display",
            "provider_payment_id",
            "amount",
            "currency",
            "status",
            "status_display",
            "metadata",
            "idempotency_key",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "provider_payment_id",
            "status",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        """
        Automatically associate transaction with authenticated user.
        """
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)