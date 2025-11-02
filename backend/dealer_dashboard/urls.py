# dealer_dashboard/urls.py
from django.urls import path
from .views import DealerDashboardView, DealerOverviewView, DealerLeaderboardView

urlpatterns = [
    path("dashboard/", DealerDashboardView.as_view(), name="dealer-dashboard"),
    path("overview/<int:dealer_id>/", DealerOverviewView.as_view(), name="dealer-overview"),
    path("leaderboard/", DealerLeaderboardView.as_view(), name="dealer-leaderboard"),
]