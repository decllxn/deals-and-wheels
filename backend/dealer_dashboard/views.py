# dealer_dashboard/views.py
from datetime import timedelta
from django.utils import timezone
from django.db import models
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from dealers.models import Dealer
from .models import DealerDailyMetrics
from .serializers import DealerDashboardSerializer, DealerOverviewSerializer


# 🔹 1️⃣ Dealer Dashboard for logged-in dealer
class DealerDashboardView(APIView):
    """
    GET /api/dealer-dashboard/dashboard/
    Returns the dealer's own dashboard summary, trends, and KPIs.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve dealer linked to the authenticated user
        dealer = getattr(request.user, "dealer_profile", None)

        # Optional admin override for testing another dealer
        if not dealer:
            dealer_id = request.query_params.get("dealer_id")
            if dealer_id and request.user.is_staff:
                dealer = Dealer.objects.filter(id=dealer_id).first()

        if not dealer:
            return Response(
                {"detail": "You are not associated with any dealer account."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = DealerDashboardSerializer(dealer)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 🔹 2️⃣ Dealer Overview (for admin / internal ops dashboards)
class DealerOverviewView(APIView):
    """
    GET /api/dealer-dashboard/overview/<int:dealer_id>/
    Provides detailed metrics for a specific dealer.
    Intended for admin or management dashboards.
    """

    permission_classes = [IsAuthenticated]  # restrict to admins

    def get(self, request, dealer_id):
        dealer = get_object_or_404(Dealer, id=dealer_id)
        serializer = DealerOverviewSerializer(dealer)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 🔹 3️⃣ Dealer Leaderboard (ranking dealers by performance)
class DealerLeaderboardView(APIView):
    """
    GET /api/dealer-dashboard/leaderboard/
    Returns top-performing dealers by health score and activity.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=7)  # default: last 7 days

        metrics = (
            DealerDailyMetrics.objects.filter(date__range=(start_date, end_date))
            .values("dealer__id", "dealer__name")
            .annotate(
                avg_health=models.Avg("health_score"),
                avg_sell_through=models.Avg("sell_through_rate"),
                total_sold=models.Sum("sold_listings"),
            )
            .order_by("-avg_health")[:10]
        )

        leaderboard = [
            {
                "dealer_id": m["dealer__id"],
                "dealer_name": m["dealer__name"],
                "avg_health_score": round(m["avg_health"] or 0, 2),
                "avg_sell_through_rate": round(m["avg_sell_through"] or 0, 2),
                "total_sold": m["total_sold"] or 0,
            }
            for m in metrics
        ]

        return Response({"leaderboard": leaderboard}, status=status.HTTP_200_OK)