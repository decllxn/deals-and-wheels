"""
billing.webhooks.mpesa_webhook
------------------------------
Handles M-Pesa callback (C2B or B2C notifications).

Expected JSON structure:
{
  "TransactionType": "Pay Bill" | "Buy Goods",
  "TransID": "ABCDE12345",
  "TransAmount": "1000.00",
  "BillRefNumber": "<transaction_id>",
  "ResultCode": 0,
  "ResultDesc": "The service request is processed successfully."
}
"""

import logging
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

from .base import parse_json_request, handle_payment_success, handle_payment_failure
from ..models import PaymentTransaction

logger = logging.getLogger(__name__)


@csrf_exempt
def mpesa_webhook(request):
    """
    Receive and process M-Pesa payment notifications.
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

    # Find the related transaction record
    txn = get_object_or_404(PaymentTransaction, id=txn_id)

    # Interpret M-Pesa result
    if result_code == 0:
        logger.info(f"M-Pesa payment success for txn {txn_id}")
        return handle_payment_success(txn, provider_payment_id)
    else:
        reason = result_desc or f"M-Pesa payment failed (code: {result_code})"
        logger.warning(f"M-Pesa payment failed for txn {txn_id}: {reason}")
        return handle_payment_failure(txn, reason)