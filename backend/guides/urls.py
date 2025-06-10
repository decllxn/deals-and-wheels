from rest_framework.routers import DefaultRouter
from .views import GuideViewSet, GuideCategoryViewSet, HashtagViewSet, LatestGuidesView, FeedView
from django.urls import path

router = DefaultRouter()
router.register(r'guides', GuideViewSet)
router.register(r'categories', GuideCategoryViewSet)
router.register(r'hashtags', HashtagViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('latest/', LatestGuidesView.as_view(), name='latest-guides'),
    path('feed/', FeedView.as_view(), name='feed'),
]
