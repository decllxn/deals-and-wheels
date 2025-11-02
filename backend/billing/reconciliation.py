# billing/reconciliation.py
from django.db.models import Sum, Count
from django.utils import timezone
from .models import Invoice, PaymentTransaction, Subscription
from .utils import format_amount


def generate_daily_report(date=None):
    """Return a summary of daily billing activity."""
    date = date or timezone.now().date()
    start = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.min.time()))
    end = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.max.time()))

    invoices = Invoice.objects.filter(created_at__range=(start, end))
    transactions = PaymentTransaction.objects.filter(created_at__range=(start, end))

    total_invoiced = invoices.aggregate(total=Sum("amount"))["total"] or 0
    total_paid = invoices.filter(paid=True).aggregate(total=Sum("amount"))["total"] or 0
    total_txn = transactions.aggregate(total=Sum("amount"))["total"] or 0

    return {
        "date": str(date),
        "invoices_created": invoices.count(),
        "transactions": transactions.count(),
        "total_invoiced": format_amount(total_invoiced),
        "total_paid": format_amount(total_paid),
        "total_transacted": format_amount(total_txn),
    }


def find_inconsistencies():
    """
    Find invoices with no matching transaction or unpaid after successful payment.
    """
    unmatched_invoices = Invoice.objects.filter(paid=False, subscription__transactions__status="success")
    orphan_transactions = PaymentTransaction.objects.filter(subscription__isnull=True, status="success")
    return {
        "unpaid_invoices_with_success_txn": unmatched_invoices,
        "successful_orphan_transactions": orphan_transactions,
    }


def reconcile_all():
    """
    Master reconciliation routine — useful for periodic admin dashboard reports.
    """
    report = {
        "daily_summary": generate_daily_report(),
        "inconsistencies": find_inconsistencies(),
        "active_subscriptions": Subscription.objects.filter(status=Subscription.STATUS_ACTIVE).count(),
    }
    return report