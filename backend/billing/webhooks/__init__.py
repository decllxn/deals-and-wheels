"""
billing.webhooks
----------------
Webhook handlers for different payment providers.

This package contains modular webhook endpoints for:
  - Stripe
  - PayPal
  - Pesapal
  - M-Pesa

Each provider has its own file (e.g., paypal_webhook.py), and all share
common utilities in base.py (for consistent JSON parsing and response handling).

To use:
    Include billing.webhooks.urls in your main billing/urls.py:
        path("webhooks/", include("billing.webhooks.urls"))
"""

import logging

# Configure a shared logger for all webhook modules
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Optional: Add a console handler if none exists (useful during local dev)
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] %(name)s: %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)

# Explicitly import submodules to register them with Django (optional but helpful)
from . import (
    base,
    paypal_webhook,
    mpesa_webhook,
)

# Re-export useful utilities for convenience
from .base import (
    parse_json_request,
    handle_payment_success,
    handle_payment_failure,
)

__all__ = [
    "base",
    "paypal_webhook",
    "stripe_webhook",
    "pesapal_webhook",
    "mpesa_webhook",
    "parse_json_request",
    "handle_payment_success",
    "handle_payment_failure",
]
