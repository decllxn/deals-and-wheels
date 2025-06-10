from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CarViewSet,
    ReviewViewSet,
    ReviewSectionViewSet,
    RatingViewSet,
    ReviewCommentViewSet,
    UserReviewFeedbackViewSet
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'review-sections', ReviewSectionViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'review-comments', ReviewCommentViewSet)
router.register(r'user-review-feedbacks', UserReviewFeedbackViewSet)

# Final URL patterns
urlpatterns = [
    path('api/', include(router.urls)),
]