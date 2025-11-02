# billing/payments/providers_utils.py
import requests
import logging
import time
from requests.auth import HTTPBasicAuth
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)

TOKEN_CACHE_KEY = "mpesa_access_token"
TOKEN_EXPIRY_SECONDS = 3400  # M-Pesa tokens usually expire in 3600s (1 hr)

def get_mpesa_access_token():
    """
    Authenticates with M-Pesa and retrieves an access token.
    Cached to prevent redundant requests.
    """
    token = cache.get(TOKEN_CACHE_KEY)
    if token:
        return token

    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    try:
        response = requests.get(
            url,
            auth=HTTPBasicAuth(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
            timeout=10
        )
        response.raise_for_status()
        token = response.json().get("access_token")
        if not token:
            raise ValueError("No access token in response")

        cache.set(TOKEN_CACHE_KEY, token, TOKEN_EXPIRY_SECONDS)
        logger.info("✅ M-Pesa access token generated and cached")
        return token

    except Exception as e:
        logger.error(f"❌ M-Pesa token retrieval failed: {e}")
        raise