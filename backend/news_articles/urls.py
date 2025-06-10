from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    NewsItemViewSet,
    NewsCommentViewSet,
    NewsCategoryList,
    HashtagList,
    CommentEmojiReactionView,
    DeleteCommentEmojiReactionView,
    NewsFeedView,
    LatestPostView,
)

router = DefaultRouter()
router.register(r'news', NewsItemViewSet, basename='news')
router.register(r'comments', NewsCommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls)),

    # List views
    path('categories/', NewsCategoryList.as_view(), name='category-list'),
    path('hashtags/', HashtagList.as_view(), name='hashtag-list'),
    path('feed/', NewsFeedView.as_view(), name='news-feed'),
    path('latest-post/', LatestPostView.as_view(), name='latest-post'),

    # Emoji reactions
    path('comments/<int:comment_id>/emoji/', CommentEmojiReactionView.as_view(), name='add-emoji-reaction'),
    path('comments/<int:comment_id>/emoji/<str:emoji>/', DeleteCommentEmojiReactionView.as_view(), name='delete-emoji-reaction'),
]