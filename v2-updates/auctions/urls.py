from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarAuctionViewSet, ReviewViewSet  # Import ReviewViewSet

router = DefaultRouter()
router.register(r"auctions", CarAuctionViewSet)
router.register(r"reviews", ReviewViewSet, basename='review')  # Register ReviewViewSet

urlpatterns = [
    path("", include(router.urls)),
]