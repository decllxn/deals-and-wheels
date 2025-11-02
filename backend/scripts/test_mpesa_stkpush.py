#!/usr/bin/env python3
"""
Manual test script for M-Pesa STK Push (Daraja Sandbox).

Usage:
    python backend/scripts/test_mpesa_stkpush.py
"""

import os
import sys
import django

# --- Ensure we can import the Django project modules ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

# --- Setup Django environment ---
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from billing.payments.mpesa_provider import MpesaProvider


def test_mpesa_stkpush():
    """
    Test M-Pesa STK Push in sandbox mode.
    """
    print("🚀 Starting M-Pesa STK Push test...")

    try:
        mpesa = MpesaProvider()
        response = mpesa.stk_push(
            phone_number="254708374149",  # Sandbox test number
            amount=1,                     # KES 1 for test
            account_reference="SUBSCRIPTION_001",
            transaction_desc="Test Payment"
        )

        print("\n✅ STK Push Request Sent Successfully!")
        print("Response:")
        print(response)

    except Exception as e:
        print("\n❌ Error during STK Push test:")
        print(str(e))


if __name__ == "__main__":
    test_mpesa_stkpush()