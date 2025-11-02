from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DealerSignupView,
    DealerViewSet,
    DealerRatingViewSet,
    DealerListingsView,
    MyDealerListingsView,
)

# 🔹 Router for viewsets
router = DefaultRouter()
router.register(r"dealers", DealerViewSet, basename="dealer")
router.register(r"dealer-ratings", DealerRatingViewSet, basename="dealer-rating")

# 🔹 Custom endpoints for listings
urlpatterns = [
    # Dealer registration endpoint
    path("signup/", DealerSignupView.as_view(), name="dealer-signup"),

    # Listings belonging to a specific dealer (public)
    path("dealers/<int:dealer_id>/listings/", DealerListingsView.as_view(), name="dealer-listings"),

    # Logged-in dealer's own listings (private)
    path("my/listings/", MyDealerListingsView.as_view(), name="my-dealer-listings"),

    # Include router-based endpoints (dealers + ratings)
    path("", include(router.urls)),
]