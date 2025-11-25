import json
import base64
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment, LiveEnvironment
from ..models import PaymentTransaction, Subscription, Plan

# --------------------------------------------------------------------
# Initialize PayPal SDK
# --------------------------------------------------------------------
MODE = getattr(settings, "PAYPAL_MODE", "sandbox").upper()

if MODE == "LIVE":
    environment = LiveEnvironment(
        client_id=settings.PAYPAL_CLIENT_ID,
        client_secret=settings.PAYPAL_SECRET,
    )
    PAYPAL_BASE = "https://api.paypal.com"
else:
    environment = SandboxEnvironment(
        client_id=settings.PAYPAL_CLIENT_ID,
        client_secret=settings.PAYPAL_SECRET,
    )
    PAYPAL_BASE = "https://api.sandbox.paypal.com"

paypal_client = PayPalHttpClient(environment)


# --------------------------------------------------------------------
# Verify PayPal webhook authenticity
# --------------------------------------------------------------------
def verify_webhook_signature(request, event):
    headers = {
        "auth_algo": request.headers.get("PAYPAL-AUTH-ALGO"),
        "cert_url": request.headers.get("PAYPAL-CERT-URL"),
        "transmission_id": request.headers.get("PAYPAL-TRANSMISSION-ID"),
        "transmission_sig": request.headers.get("PAYPAL-TRANSMISSION-SIG"),
        "transmission_time": request.headers.get("PAYPAL-TRANSMISSION-TIME"),
    }

    if not all(headers.values()):
        return False

    # Skip verification in sandbox
    if MODE != "LIVE":
        return True

    auth_str = f"{settings.PAYPAL_CLIENT_ID}:{settings.PAYPAL_SECRET}"
    b64_auth = base64.b64encode(auth_str.encode()).decode()
    token_resp = requests.post(
        f"{PAYPAL_BASE}/v1/oauth2/token",
        data={"grant_type": "client_credentials"},
        headers={"Authorization": f"Basic {b64_auth}"},
        timeout=10,
    )
    if token_resp.status_code != 200:
        return False

    access_token = token_resp.json().get("access_token")
    verification_payload = {
        **headers,
        "webhook_id": settings.PAYPAL_WEBHOOK_ID,
        "webhook_event": event
    }
    verify_resp = requests.post(
        f"{PAYPAL_BASE}/v1/notifications/verify-webhook-signature",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        },
        json=verification_payload,
        timeout=10,
    )
    return verify_resp.json().get("verification_status") == "SUCCESS"


# --------------------------------------------------------------------
# Webhook endpoint
# --------------------------------------------------------------------
@csrf_exempt
@require_POST
def paypal_webhook(request):
    try:
        event = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"status": "invalid_json"}, status=400)

    event_type = event.get("event_type")
    resource = event.get("resource", {})
    payment_id = resource.get("id")

    if not verify_webhook_signature(request, event):
        return JsonResponse({"status": "invalid_signature"}, status=400)

    # -------------------------
    # Payment events
    # -------------------------
    if event_type in ("PAYMENT.CAPTURE.COMPLETED", "CHECKOUT.ORDER.APPROVED"):
        txn = PaymentTransaction.objects.filter(provider_payment_id=payment_id).first()
        if txn:
            txn.mark_success(provider_payment_id=payment_id)
        return JsonResponse({"status": "success", "transaction_id": txn.id if txn else None})

    elif event_type in ("PAYMENT.CAPTURE.DENIED", "PAYMENT.SALE.DENIED"):
        txn = PaymentTransaction.objects.filter(provider_payment_id=payment_id).first()
        if txn:
            txn.mark_failed("PayPal denied payment.")
        return JsonResponse({"status": "failed", "transaction_id": txn.id if txn else None})

    elif event_type in ("PAYMENT.CAPTURE.REFUNDED", "PAYMENT.SALE.REFUNDED"):
        txn = PaymentTransaction.objects.filter(provider_payment_id=payment_id).first()
        if txn:
            txn.status = PaymentTransaction.STATUS_REFUNDED
            txn.save(update_fields=["status"])
        return JsonResponse({"status": "refunded", "transaction_id": txn.id if txn else None})

    # -------------------------
    # Subscription events (Option 1: update only)
    # -------------------------
    elif event_type.startswith("BILLING.SUBSCRIPTION."):
        sub_id = resource.get("id")
        subscription = Subscription.objects.filter(provider_subscription_id=sub_id).first()

        if not subscription:
            # Subscription not in DB, log for manual reconciliation
            print(f"PayPal subscription {sub_id} not found in DB")
            return JsonResponse({"status": "subscription_not_found", "subscription_id": sub_id}, status=404)

        if event_type == "BILLING.SUBSCRIPTION.CANCELLED":
            subscription.status = Subscription.STATUS_CANCELLED
        elif event_type == "BILLING.SUBSCRIPTION.ACTIVATED":
            subscription.status = Subscription.STATUS_ACTIVE
        elif event_type == "BILLING.SUBSCRIPTION.UPDATED":
            subscription.status = resource.get("status", subscription.status)

        subscription.save(update_fields=["status"])
        return JsonResponse({"status": "subscription_updated", "subscription_id": sub_id})

    # -------------------------
    # Plan events
    # -------------------------
    elif event_type.startswith("BILLING.PLAN."):
        plan_id = resource.get("id")
        plan = Plan.objects.filter(slug=plan_id).first()
        if not plan:
            return JsonResponse({"status": "plan_not_found", "plan_id": plan_id}, status=404)

        if event_type == "BILLING.PLAN.ACTIVATED":
            plan.status = "active"
        elif event_type == "BILLING.PLAN.DEACTIVATED":
            plan.status = "inactive"
        elif event_type == "BILLING.PLAN.UPDATED":
            plan.status = resource.get("status", getattr(plan, "status", None))

        plan.save(update_fields=["status"])
        return JsonResponse({"status": "plan_updated", "plan_id": plan_id})

    # -------------------------
    # Unsupported events
    # -------------------------
    return JsonResponse({"status": "ignored", "event": event_type})