# billing/utils.py
import uuid
from decimal import Decimal, ROUND_HALF_UP
from django.utils import timezone

# ----------------------------
# CURRENCY / AMOUNT HELPERS
# ----------------------------
def format_amount(amount: Decimal, currency: str = "KES") -> str:
    """Return a human-friendly amount string like 'KES 1,200.00'."""
    if not isinstance(amount, Decimal):
        amount = Decimal(str(amount))
    formatted = f"{currency} {amount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP):,.2f}"
    return formatted


def normalize_amount(value) -> Decimal:
    """Ensure consistent decimal rounding."""
    return Decimal(str(value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


# ----------------------------
# REFERENCE / IDENTIFIER HELPERS
# ----------------------------
def generate_reference(prefix: str = "REF") -> str:
    """Generate a unique reference string."""
    return f"{prefix}-{uuid.uuid4().hex[:12].upper()}"


# ----------------------------
# DATE / TIME HELPERS
# ----------------------------
def days_until(dt) -> int:
    """Return days remaining until a given datetime."""
    if not dt:
        return 0
    delta = dt - timezone.now()
    return max(delta.days, 0)


def period_string(start, end):
    """Return a readable period string (e.g., 'Oct 1, 2025 — Nov 1, 2025')."""
    if not start or not end:
        return "N/A"
    return f"{start.strftime('%b %d, %Y')} — {end.strftime('%b %d, %Y')}"