from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DealerSignupView,
    DealerViewSet,
    DealerRatingViewSet,
    DealerListingsView,
    MyDealerListingsView,
)

# ============================================================
# 🔹 Router for viewsets (handles /api/dealers/, /api/dealer-ratings/, etc.)
# ============================================================
router = DefaultRouter()
router.register(r"dealers", DealerViewSet, basename="dealer")
router.register(r"dealer-ratings", DealerRatingViewSet, basename="dealer-rating")

# ============================================================
# 🔹 Custom endpoints
# ============================================================
urlpatterns = [
    # Dealer signup
    path("dealers/signup/", DealerSignupView.as_view(), name="dealer-signup"),

    # Public dealer listings (by slug)
    path("dealers/<slug:slug>/listings/", DealerListingsView.as_view(), name="dealer-listings"),

    # Logged-in dealer’s own listings (dashboard)
    path("dealers/my/listings/", MyDealerListingsView.as_view(), name="my-dealer-listings"),

    # Include router-based endpoints (dealers/, dealer-ratings/, etc.)
    path("", include(router.urls)),
]