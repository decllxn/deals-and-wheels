# billing/idempotency.py
from contextlib import contextmanager
from django.db import transaction
from django.core.cache import cache
from .models import PaymentTransaction

CACHE_TIMEOUT = 60 * 5  # 5 minutes


@contextmanager
def idempotent_operation(key: str):
    """
    Context manager to prevent duplicate webhook/payment processing.
    Uses cache-based lock (and optionally database key check).
    """
    lock_key = f"idempotency:{key}"
    if cache.get(lock_key):
        raise RuntimeError(f"Duplicate event detected for idempotency key: {key}")

    cache.set(lock_key, True, timeout=CACHE_TIMEOUT)
    try:
        yield
    finally:
        cache.delete(lock_key)


def get_or_create_transaction(idempotency_key: str, defaults: dict):
    """
    Return existing transaction if idempotency key exists, otherwise create.
    """
    with transaction.atomic():
        txn, created = PaymentTransaction.objects.get_or_create(
            idempotency_key=idempotency_key,
            defaults=defaults,
        )
        return txn, created