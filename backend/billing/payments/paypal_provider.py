import paypalrestsdk
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # "sandbox" or "live"
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_SECRET,
})


def create_paypal_payment(amount, return_url, cancel_url, description="Purchase from Zamara"):
    """
    Create a PayPal payment and return the approval URL.
    """
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {"payment_method": "paypal"},
        "redirect_urls": {
            "return_url": return_url,
            "cancel_url": cancel_url,
        },
        "transactions": [{
            "amount": {
                "total": f"{amount:.2f}",
                "currency": "USD"
            },
            "description": description,
        }],
    })

    if payment.create():
        logger.info(f"PayPal Payment created successfully: {payment.id}")
        # Extract redirect approval link
        for link in payment.links:
            if link.method == "REDIRECT":
                return link.href, payment.id
    else:
        logger.error(f"PayPal Payment creation failed: {payment.error}")
        raise Exception(payment.error)


def execute_paypal_payment(payment_id, payer_id):
    """
    Execute an approved PayPal payment after user approval.
    """
    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        logger.info(f"PayPal Payment executed successfully: {payment.id}")
        return payment
    else:
        logger.error(f"PayPal Payment execution failed: {payment.error}")
        raise Exception(payment.error)
