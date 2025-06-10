from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
    BlogViewSet,
    CategoryViewSet,
    HashtagViewSet,
    CommentListCreateView,
    BlogLikeListView,
    BlogShareListView,
    CommentLikeListView,
    recommended_blogs,
    latest_blog_post,
    blog_detail,
    blog_detail_slug,  # ✅ Enabled slug-based blog detail
    ManufacturerViewSet
)

# Router setup for viewsets
router = DefaultRouter()
router.register(r'blogs', BlogViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'hashtags', HashtagViewSet)
router.register(r'manufacturers', ManufacturerViewSet)

# Custom endpoints
urlpatterns = router.urls + [
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('blog-likes/', BlogLikeListView.as_view(), name='blog-likes'),
    path('blog-shares/', BlogShareListView.as_view(), name='blog-shares'),
    path('comment-likes/', CommentLikeListView.as_view(), name='comment-likes'),

    # Custom blog logic
    path('recommended/<int:blog_id>/', recommended_blogs, name='recommended-blogs'),
    path('latest/', latest_blog_post, name='latest-blog-post'),
    path('details/<int:blog_id>/', blog_detail, name='blog-detail'),
    path('details/slug/<slug:slug>/', blog_detail_slug, name='blog-detail-slug'),  # ✅ Slug route enabled
]
