from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, ReviewViewSet, latest_reviews

router = DefaultRouter()
router.register(r'cars', CarViewSet, basename='cars')
router.register(r'reviews', ReviewViewSet, basename='reviews')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/latest-reviews/', latest_reviews, name='latest-reviews'),  # ✅ moved out of /reviews/ namespace
]