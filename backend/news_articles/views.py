from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Count

from .models import (
    NewsItem, NewsCategory, Hashtag,
    NewsComment, CommentEmojiReaction
)
from .serializers import (
    NewsItemSerializer, NewsCategorySerializer, HashtagSerializer,
    NewsCommentSerializer, CommentEmojiReactionSerializer
)
from .utils import get_news_recommendations, get_feed_for_user


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS or obj.user == request.user


class NewsItemViewSet(viewsets.ModelViewSet):
    queryset = NewsItem.objects.all().order_by("-published_at")
    serializer_class = NewsItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['category', 'manufacturer', 'hashtags']
    ordering_fields = ['views', 'published_at']
    ordering = ['-published_at']
    search_fields = ['title', 'content']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        news = self.get_object()
        news.liked_by.add(request.user)
        return Response({'status': 'liked'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unlike(self, request, pk=None):
        news = self.get_object()
        news.liked_by.remove(request.user)
        return Response({'status': 'unliked'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def share(self, request, pk=None):
        news = self.get_object()
        news.shared_by.add(request.user)
        return Response({'status': 'shared'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def increment_view(self, request, pk=None):
        news = self.get_object()
        news.increment_views()
        return Response({'status': 'view count incremented'})

    @action(detail=False, methods=['get'])
    def trending(self, request):
        trending_news = NewsItem.objects.annotate(
            num_likes=Count('liked_by')
        ).order_by('-views', '-num_likes')[:5]
        serializer = self.get_serializer(trending_news, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny])
    def recommended(self, request, pk=None):
        try:
            news_id = int(pk)
            recommended_news = get_news_recommendations(news_id)
            serializer = self.get_serializer(recommended_news, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class NewsCategoryList(generics.ListAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
    filter_backends = [DjangoFilterBackend]


class HashtagList(generics.ListAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer
    filter_backends = [DjangoFilterBackend]


class NewsCommentViewSet(viewsets.ModelViewSet):
    queryset = NewsComment.objects.filter(parent=None).order_by('-created_at')
    serializer_class = NewsCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        comment = self.get_object()
        comment.liked_by.add(request.user)
        return Response({'status': 'liked comment'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unlike(self, request, pk=None):
        comment = self.get_object()
        comment.liked_by.remove(request.user)
        return Response({'status': 'unliked comment'})


class CommentEmojiReactionView(generics.CreateAPIView):
    serializer_class = CommentEmojiReactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        comment_id = self.kwargs['comment_id']
        comment = get_object_or_404(NewsComment, id=comment_id)
        serializer.save(user=self.request.user, comment=comment)


class DeleteCommentEmojiReactionView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment_id = kwargs['comment_id']
        emoji = kwargs['emoji']
        reaction = get_object_or_404(CommentEmojiReaction, comment_id=comment_id, emoji=emoji, user=request.user)
        reaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NewsFeedView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        feed = get_feed_for_user(request.user)
        serializer = NewsItemSerializer(feed, many=True, context={'request': request})
        return Response(serializer.data)


class LatestPostView(generics.ListAPIView):
    queryset = NewsItem.objects.all().order_by('-published_at')[:1]
    serializer_class = NewsItemSerializer

    def get(self, request, *args, **kwargs):
        latest_post = self.get_queryset().first()
        if latest_post:
            return Response(self.get_serializer(latest_post).data)
        return Response({"detail": "No posts available."}, status=404)