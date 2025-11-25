"""
billing.webhooks.base
---------------------
Provides reusable helper utilities for all payment provider webhooks:
- Safe JSON parsing
- Unified success and failure handlers
- Consistent logging
"""

import json
import logging
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ..models import PaymentTransaction
from .. import services

logger = logging.getLogger(__name__)

# -------------------------------------------
# JSON parsing
# -------------------------------------------

def parse_json_request(request):
    """
    Safely parse JSON body from webhook POST.

    Returns:
        dict | None
    """
    try:
        body = request.body.decode("utf-8")
        if not body:
            logger.warning("Empty JSON body in webhook request")
            return None
        return json.loads(body)
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in webhook: {e}")
    except Exception as e:
        logger.exception(f"Unexpected error parsing webhook JSON: {e}")
    return None


# -------------------------------------------
# Payment handlers
# -------------------------------------------

def handle_payment_success(transaction, provider_payment_id=None):
    """
    Unified handler for successful payments from any provider.

    Args:
        transaction (PaymentTransaction): The related transaction object.
        provider_payment_id (str, optional): The payment ID from the provider.
    """
    logger.info(
        f"✅ Webhook success: Transaction {transaction.pk}, "
        f"Provider ID: {provider_payment_id or 'N/A'}"
    )
    try:
        services.process_payment_success(transaction)
    except Exception as e:
        logger.exception(f"Error processing payment success for {transaction.pk}: {e}")
        return JsonResponse({"status": "error", "detail": "Internal processing error"}, status=500)

    return JsonResponse({
        "status": "success",
        "transaction_id": transaction.pk,
        "provider_payment_id": provider_payment_id
    })


def handle_payment_failure(transaction, reason="Payment failed"):
    """
    Unified handler for failed payments from any provider.

    Args:
        transaction (PaymentTransaction): The related transaction object.
        reason (str): Description of the failure reason.
    """
    logger.warning(f"❌ Webhook failure: Transaction {transaction.pk} — {reason}")
    try:
        services.process_payment_failure(transaction, reason)
    except Exception as e:
        logger.exception(f"Error processing payment failure for {transaction.pk}: {e}")
        return JsonResponse({"status": "error", "detail": "Internal processing error"}, status=500)

    return JsonResponse({
        "status": "failed",
        "transaction_id": transaction.pk,
        "reason": reason
    })