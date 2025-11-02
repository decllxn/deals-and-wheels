# billing/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PlanViewSet,
    BillingCustomerViewSet,
    SubscriptionViewSet,
    InvoiceViewSet,
    PaymentTransactionViewSet,
)

# --------------------------------------------------------
# ROUTER SETUP
# --------------------------------------------------------
router = DefaultRouter()
router.register(r'plans', PlanViewSet, basename='plan')
router.register(r'customers', BillingCustomerViewSet, basename='billing-customer')
router.register(r'subscriptions', SubscriptionViewSet, basename='subscription')
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'transactions', PaymentTransactionViewSet, basename='transaction')

# --------------------------------------------------------
# URL PATTERNS
# --------------------------------------------------------
urlpatterns = [
    path('', include(router.urls)),
]