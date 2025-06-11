from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'cars', CarViewSet, basename='cars')
router.register(r'reviews', ReviewViewSet, basename='reviews')

urlpatterns = [
    path('api/', include(router.urls)),
]