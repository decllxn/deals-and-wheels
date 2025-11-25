"""
billing.urls
-------------
Main routing for the billing app — includes API endpoints and webhooks.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"plans", views.PlanViewSet, basename="plan")
router.register(r"customers", views.BillingCustomerViewSet, basename="customer")
router.register(r"subscriptions", views.SubscriptionViewSet, basename="subscription")
router.register(r"invoices", views.InvoiceViewSet, basename="invoice")
router.register(r"transactions", views.PaymentTransactionViewSet, basename="transaction")

urlpatterns = [
    path("", include(router.urls)),
    path("webhooks/", include("billing.webhooks.urls", namespace="webhooks")),
]