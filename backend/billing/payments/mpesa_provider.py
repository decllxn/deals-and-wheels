# billing/payments/mpesa_provider.py
import requests
import base64
import datetime
import logging
from django.conf import settings
from .providers_utils import get_mpesa_access_token

logger = logging.getLogger(__name__)

class MpesaProvider:
    """
    Handles interactions with Safaricom M-Pesa API.
    """

    BASE_URL = "https://sandbox.safaricom.co.ke"
    SHORT_CODE = settings.MPESA_SHORTCODE       # Add to .env
    PASSKEY = settings.MPESA_PASSKEY            # Add to .env
    CALLBACK_URL = settings.MPESA_CALLBACK_URL  # Add to .env

    def __init__(self):
        self.token = get_mpesa_access_token()

    def _headers(self):
        return {"Authorization": f"Bearer {self.token}"}

    def stk_push(self, phone_number: str, amount: int, account_reference: str, transaction_desc: str):
        """
        Initiates an STK Push to the customer’s phone.
        """
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            f"{self.SHORT_CODE}{self.PASSKEY}{timestamp}".encode("utf-8")
        ).decode("utf-8")

        payload = {
            "BusinessShortCode": self.SHORT_CODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": self.SHORT_CODE,
            "PhoneNumber": phone_number,
            "CallBackURL": self.CALLBACK_URL,
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc,
        }

        url = f"{self.BASE_URL}/mpesa/stkpush/v1/processrequest"

        try:
            response = requests.post(url, json=payload, headers=self._headers(), timeout=15)
            response.raise_for_status()
            logger.info(f"✅ M-Pesa STK Push initiated for {phone_number}")
            return response.json()
        except Exception as e:
            logger.error(f"❌ M-Pesa STK Push failed: {e}")
            raise