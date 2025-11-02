# billing/webhooks.py
import json
import logging
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import PaymentTransaction
from . import services

logger = logging.getLogger(__name__)

# =========================================================
# GENERIC UTILITIES
# =========================================================

def parse_json_request(request):
    """Safely parse JSON body from webhook POST."""
    try:
        return json.loads(request.body.decode("utf-8"))
    except Exception as e:
        logger.error(f"Invalid JSON in webhook: {e}")
        return None


def handle_payment_success(transaction, provider_payment_id=None):
    """Central handler for successful provider payment."""
    logger.info(f"✅ Payment success from webhook for txn {transaction.pk}")
    services.process_payment_success(transaction)
    return JsonResponse({"status": "success", "transaction_id": transaction.pk})


def handle_payment_failure(transaction, reason="Payment failed"):
    """Central handler for failed provider payment."""
    logger.warning(f"❌ Payment failure from webhook for txn {transaction.pk}: {reason}")
    services.process_payment_failure(transaction, reason)
    return JsonResponse({"status": "failed", "transaction_id": transaction.pk})


# =========================================================
# STRIPE WEBHOOK
# =========================================================

@csrf_exempt
def stripe_webhook(request):
    """
    Handle Stripe webhook events.

    Expected events:
      - payment_intent.succeeded
      - payment_intent.payment_failed
    """
    payload = parse_json_request(request)
    if not payload:
        return HttpResponse(status=400)

    event_type = payload.get("type")
    data = payload.get("data", {}).get("object", {})
    txn_id = data.get("metadata", {}).get("transaction_id")

    if not txn_id:
        logger.error("Stripe webhook missing transaction_id in metadata")
        return HttpResponse(status=400)

    txn = get_object_or_404(PaymentTransaction, id=txn_id)

    if event_type == "payment_intent.succeeded":
        return handle_payment_success(txn, provider_payment_id=data.get("id"))
    elif event_type == "payment_intent.payment_failed":
        reason = data.get("last_payment_error", {}).get("message", "Payment failed")
        return handle_payment_failure(txn, reason)
    else:
        logger.info(f"Unhandled Stripe event type: {event_type}")
        return HttpResponse(status=200)


# =========================================================
# PAYPAL WEBHOOK
# =========================================================

@csrf_exempt
def paypal_webhook(request):
    """
    Handle PayPal webhook notifications.

    Expected JSON fields:
      - event_type: PAYMENT.SALE.COMPLETED or PAYMENT.SALE.DENIED
      - resource.id (PayPal payment ID)
      - resource.invoice_number (maps to PaymentTransaction.id)
    """
    payload = parse_json_request(request)
    if not payload:
        return HttpResponse(status=400)

    event_type = payload.get("event_type")
    resource = payload.get("resource", {})
    txn_id = resource.get("invoice_number")

    if not txn_id:
        logger.error("PayPal webhook missing invoice_number (transaction_id)")
        return HttpResponse(status=400)

    txn = get_object_or_404(PaymentTransaction, id=txn_id)

    if event_type == "PAYMENT.SALE.COMPLETED":
        return handle_payment_success(txn, provider_payment_id=resource.get("id"))
    elif event_type == "PAYMENT.SALE.DENIED":
        return handle_payment_failure(txn, "Payment denied by PayPal")
    else:
        logger.info(f"Unhandled PayPal event: {event_type}")
        return HttpResponse(status=200)


# =========================================================
# PESAPAL WEBHOOK
# =========================================================

@csrf_exempt
def pesapal_webhook(request):
    """
    Handle Pesapal Instant Payment Notification (IPN).
    Expected params:
      - OrderTrackingId
      - OrderMerchantReference (transaction_id)
      - Status (COMPLETED, FAILED, INVALID)
    """
    data = request.GET or request.POST
    txn_id = data.get("OrderMerchantReference")
    status = data.get("Status")
    provider_payment_id = data.get("OrderTrackingId")

    if not txn_id:
        logger.error("Pesapal webhook missing OrderMerchantReference")
        return HttpResponse(status=400)

    txn = get_object_or_404(PaymentTransaction, id=txn_id)

    if status == "COMPLETED":
        return handle_payment_success(txn, provider_payment_id)
    elif status in ["FAILED", "INVALID"]:
        return handle_payment_failure(txn, f"Pesapal status: {status}")
    else:
        logger.info(f"Unhandled Pesapal status: {status}")
        return HttpResponse(status=200)


# =========================================================
# MPESA WEBHOOK
# =========================================================

@csrf_exempt
def mpesa_webhook(request):
    """
    Handle M-Pesa payment callback (C2B simulation or real).
    Expected JSON:
      {
        "TransactionType": "Pay Bill" | "Buy Goods",
        "TransID": "ABCDE12345",
        "TransAmount": "1000.00",
        "BillRefNumber": "<transaction_id>",
        "ResultCode": 0,
        "ResultDesc": "The service request is processed successfully."
      }
    """
    payload = parse_json_request(request)
    if not payload:
        return HttpResponse(status=400)

    txn_id = payload.get("BillRefNumber")
    result_code = payload.get("ResultCode")
    result_desc = payload.get("ResultDesc")
    provider_payment_id = payload.get("TransID")

    if not txn_id:
        logger.error("M-Pesa webhook missing BillRefNumber (transaction_id)")
        return HttpResponse(status=400)

    txn = get_object_or_404(PaymentTransaction, id=txn_id)

    if result_code == 0:
        return handle_payment_success(txn, provider_payment_id)
    else:
        return handle_payment_failure(txn, result_desc or "M-Pesa payment failed")