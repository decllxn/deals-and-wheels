from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CarListingViewSet, CarListingImageViewSet, CarListingFeatureViewSet,
    CarListingEquipmentViewSet, CarListingModificationViewSet,
    CarListingKnownFlawViewSet, CarListingVideoWalkaroundViewSet
)

router = DefaultRouter()
router.register(r"listings", CarListingViewSet, basename='listing')
router.register(r"listing-images", CarListingImageViewSet, basename='listing-image')
router.register(r"listing-features", CarListingFeatureViewSet, basename='listing-feature')
router.register(r"listing-equipment", CarListingEquipmentViewSet, basename='listing-equipment')
router.register(r"listing-modifications", CarListingModificationViewSet, basename='listing-modification')
router.register(r"listing-known-flaws", CarListingKnownFlawViewSet, basename='listing-known-flaw')
router.register(r"listing-videos", CarListingVideoWalkaroundViewSet, basename='listing-video')

urlpatterns = [
    path("", include(router.urls)),
]