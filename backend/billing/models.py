# billing/models.py
from decimal import Decimal
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

# Use settings.AUTH_USER_MODEL as a lazy reference (recommended for custom user models)
AUTH_USER = settings.AUTH_USER_MODEL


class Plan(models.Model):
    INTERVAL_MONTH = "month"
    INTERVAL_YEAR = "year"
    INTERVAL_CHOICES = (
        (INTERVAL_MONTH, "Monthly"),
        (INTERVAL_YEAR, "Yearly"),
    )

    slug = models.SlugField(unique=True, max_length=100)
    name = models.CharField(max_length=200)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
        help_text="Price per billing interval in smallest currency unit (decimal)."
    )
    currency = models.CharField(max_length=8, default="KES")
    interval = models.CharField(max_length=10, choices=INTERVAL_CHOICES, default=INTERVAL_MONTH)
    trial_days = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("price", "name")
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["price"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.interval})"


class BillingCustomer(models.Model):
    """
    Mapping between local user and external provider customer (e.g. Stripe customer id).
    """
    user = models.OneToOneField(AUTH_USER, on_delete=models.CASCADE, related_name="billing_customer")
    provider_customer_id = models.CharField(max_length=255, blank=True, null=True)  # provider's customer id
    default_payment_method = models.CharField(max_length=255, blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["provider_customer_id"]),
        ]

    def __str__(self):
        return f"BillingCustomer(user_id={self.user_id})"


class Subscription(models.Model):
    STATUS_ACTIVE = "active"
    STATUS_TRIALING = "trialing"
    STATUS_PAST_DUE = "past_due"
    STATUS_CANCELLED = "cancelled"
    STATUS_UNPAID = "unpaid"
    STATUS_EXPIRED = "expired"

    STATUS_CHOICES = (
        (STATUS_ACTIVE, "Active"),
        (STATUS_TRIALING, "Trialing"),
        (STATUS_PAST_DUE, "Past due"),
        (STATUS_CANCELLED, "Cancelled"),
        (STATUS_UNPAID, "Unpaid"),
        (STATUS_EXPIRED, "Expired")
    )

    user = models.ForeignKey(AUTH_USER, on_delete=models.CASCADE, related_name="subscriptions")
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, related_name="subscriptions")
    provider = models.CharField(max_length=32)  # 'stripe','paypal','pesapal','mpesa'
    provider_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default=STATUS_TRIALING)
    current_period_start = models.DateTimeField(null=True, blank=True)
    current_period_end = models.DateTimeField(null=True, blank=True)
    cancel_at = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["provider", "provider_subscription_id"]),
            models.Index(fields=["user"]),
        ]

    def __str__(self):
        return f"Subscription(user_id={self.user_id}, plan={self.plan_id}, status={self.status})"

    # Convenience helpers
    def is_active(self):
        return self.status == self.STATUS_ACTIVE

    def start_trial(self, now=None):
        """Set trialing status and calculate current_period_end using plan.trial_days."""
        now = now or timezone.now()
        self.current_period_start = now
        if self.plan and self.plan.trial_days:
            self.current_period_end = now + timezone.timedelta(days=self.plan.trial_days)
        else:
            self.current_period_end = None
        self.status = self.STATUS_TRIALING
        self.save(update_fields=["current_period_start", "current_period_end", "status", "updated_at"])

    def cancel(self, at_period_end=True):
        """Cancel subscription immediately or at period end."""
        if at_period_end and self.current_period_end:
            self.cancel_at = self.current_period_end
        else:
            self.cancel_at = timezone.now()
            self.status = self.STATUS_CANCELLED
        self.save(update_fields=["cancel_at", "status", "updated_at"])


class Invoice(models.Model):
    subscription = models.ForeignKey(Subscription, null=True, blank=True, on_delete=models.SET_NULL, related_name="invoices")
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))])
    currency = models.CharField(max_length=8, default="KES")
    provider_invoice_id = models.CharField(max_length=255, blank=True, null=True)
    paid = models.BooleanField(default=False)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["provider_invoice_id"]),
            models.Index(fields=["paid"]),
        ]

    def mark_paid(self, paid_at=None, provider_invoice_id=None):
        self.paid = True
        self.paid_at = paid_at or timezone.now()
        if provider_invoice_id:
            self.provider_invoice_id = provider_invoice_id
        self.save(update_fields=["paid", "paid_at", "provider_invoice_id", "metadata"])


class PaymentTransaction(models.Model):
    PROVIDER_STRIPE = "stripe"
    PROVIDER_PAYPAL = "paypal"
    PROVIDER_PESAPAL = "pesapal"
    PROVIDER_MPESA = "mpesa"

    PROVIDER_CHOICES = (
        (PROVIDER_STRIPE, "Stripe"),
        (PROVIDER_PAYPAL, "PayPal"),
        (PROVIDER_PESAPAL, "Pesapal"),
        (PROVIDER_MPESA, "Mpesa"),
    )

    STATUS_PENDING = "pending"
    STATUS_SUCCESS = "success"
    STATUS_FAILED = "failed"
    STATUS_REFUNDED = "refunded"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_SUCCESS, "Success"),
        (STATUS_FAILED, "Failed"),
        (STATUS_REFUNDED, "Refunded"),
    )

    subscription = models.ForeignKey(Subscription, null=True, blank=True, on_delete=models.SET_NULL, related_name="transactions")
    user = models.ForeignKey(AUTH_USER, on_delete=models.CASCADE, related_name="payment_transactions")
    provider = models.CharField(max_length=32, choices=PROVIDER_CHOICES)
    provider_payment_id = models.CharField(max_length=255, blank=True, null=True)  # charge id / transaction id from provider
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))])
    currency = models.CharField(max_length=8, default="KES")
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default=STATUS_PENDING)
    metadata = models.JSONField(default=dict, blank=True)
    idempotency_key = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["provider", "provider_payment_id"]),
            models.Index(fields=["idempotency_key"]),
        ]

    def __str__(self):
        return f"PaymentTransaction(user_id={self.user_id}, provider={self.provider}, amount={self.amount}, status={self.status})"

    def mark_success(self, provider_payment_id=None, paid_at=None):
        self.status = self.STATUS_SUCCESS
        if provider_payment_id:
            self.provider_payment_id = provider_payment_id
        self.updated_at = paid_at or timezone.now()
        self.save(update_fields=["status", "provider_payment_id", "updated_at"])

    def mark_failed(self, reason=None):
        self.status = self.STATUS_FAILED
        if reason:
            self.metadata.setdefault("failure_reason", reason)
        self.save(update_fields=["status", "metadata", "updated_at"])