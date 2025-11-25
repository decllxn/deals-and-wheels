"""
billing.webhooks.urls
---------------------
Routes for payment provider webhooks (PayPal, M-Pesa, etc.)
"""

from django.urls import path
from . import paypal_webhook, mpesa_webhook

app_name = "webhooks"

urlpatterns = [
    path("paypal/", paypal_webhook.paypal_webhook, name="paypal_webhook"),
    path("mpesa/", mpesa_webhook.mpesa_webhook, name="mpesa_webhook"),
]