# billing/views.py
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    Plan,
    BillingCustomer,
    Subscription,
    Invoice,
    PaymentTransaction,
)
from .serializers import (
    PlanSerializer,
    BillingCustomerSerializer,
    SubscriptionSerializer,
    InvoiceSerializer,
    PaymentTransactionSerializer,
)
from . import services


# --------------------------------------------------------
# PLAN VIEWSET
# --------------------------------------------------------
class PlanViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public plans list — accessible to anyone.
    """
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]


# --------------------------------------------------------
# BILLING CUSTOMER VIEWSET
# --------------------------------------------------------
class BillingCustomerViewSet(viewsets.ModelViewSet):
    """
    Billing customer record for each user (one-to-one).
    """
    serializer_class = BillingCustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BillingCustomer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --------------------------------------------------------
# SUBSCRIPTION VIEWSET
# --------------------------------------------------------
class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    Manage user subscriptions via service layer.
    """
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Create subscription using the service layer.
        """
        plan = serializer.validated_data["plan"]
        subscription = services.create_subscription(self.request.user, plan)
        serializer.instance = subscription  # ensures DRF response has correct data
        return subscription

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        """
        Cancel subscription (immediate or at end of period).
        """
        subscription = self.get_object()
        at_period_end = request.data.get("at_period_end", True)
        services.cancel_subscription(subscription, at_period_end)
        return Response({
            "status": "cancelled",
            "at_period_end": at_period_end
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def renew(self, request, pk=None):
        """
        Manually renew subscription.
        """
        subscription = self.get_object()
        renewed = services.renew_subscription(subscription)
        if not renewed:
            return Response({"detail": "Subscription not active or cannot be renewed."},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "status": "renewed",
            "current_period_start": renewed.current_period_start,
            "current_period_end": renewed.current_period_end,
        })


# --------------------------------------------------------
# INVOICE VIEWSET
# --------------------------------------------------------
class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only invoices for the current user.
    """
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Invoice.objects.filter(subscription__user=self.request.user)


# --------------------------------------------------------
# PAYMENT TRANSACTION VIEWSET
# --------------------------------------------------------
class PaymentTransactionViewSet(viewsets.ModelViewSet):
    """
    Create and simulate payment transactions.
    Uses service layer for processing results.
    """
    serializer_class = PaymentTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PaymentTransaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        transaction = serializer.save(user=self.request.user)
        # Provider initiation logic (e.g., create checkout session) can go here
        return transaction

    # -------------------------------
    # Simulated payment actions
    # -------------------------------
    @action(detail=True, methods=["post"])
    def simulate_success(self, request, pk=None):
        """
        Simulate successful payment — delegates to services.
        """
        txn = self.get_object()
        invoice = services.process_payment_success(txn)

        return Response({
            "message": "Payment simulated successfully.",
            "transaction": PaymentTransactionSerializer(txn, context={"request": request}).data,
            "invoice": InvoiceSerializer(invoice, context={"request": request}).data,
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def simulate_failure(self, request, pk=None):
        """
        Simulate failed payment — delegates to services.
        """
        txn = self.get_object()
        reason = request.data.get("reason", "Payment failed during simulation.")
        services.process_payment_failure(txn, reason)

        return Response({
            "message": "Payment failed (simulated).",
            "transaction": PaymentTransactionSerializer(txn, context={"request": request}).data
        }, status=status.HTTP_400_BAD_REQUEST)