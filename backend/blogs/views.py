from rest_framework import viewsets, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Category, Hashtag, Blog, BlogLike, BlogShare,
    Comment, CommentLike
)
from .serializers import (
    CategorySerializer, HashtagSerializer, BlogSerializer, BlogLikeSerializer,
    BlogShareSerializer, CommentSerializer, CommentLikeSerializer
)
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db import models
from .utils import get_blog_recommendations
from django.shortcuts import get_object_or_404
from manufacturers.models import Manufacturer
from manufacturers.serializers import ManufacturerSerializer


# ✅ Manufacturer ViewSet
class ManufacturerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend]


# ✅ Blog ViewSet
class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.filter(is_published=True)
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['title', 'content']
    filterset_fields = ['category__slug', 'manufacturer__slug', 'hashtags__slug']
    ordering_fields = ['created_at', 'published_at', 'views', 'read_time']
    ordering = ['-published_at']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views = models.F('views') + 1
        instance.save(update_fields=['views'])
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def trending(self, request):
        days = int(request.query_params.get('days', 7))
        since = timezone.now() - timedelta(days=days)
        trending_blogs = Blog.objects.filter(
            is_published=True,
            published_at__gte=since
        ).order_by('-views')[:10]
        serializer = self.get_serializer(trending_blogs, many=True)
        return Response(serializer.data)


# ✅ Category ViewSet
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = '__all__'
    ordering = ['name']


# ✅ Hashtag ViewSet
class HashtagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend]


# ✅ Comments
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['blog']

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            serializer.save()


# ✅ Likes, Shares, Comment Likes
class BlogLikeListView(generics.ListAPIView):
    queryset = BlogLike.objects.all()
    serializer_class = BlogLikeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['blog']


class BlogShareListView(generics.ListAPIView):
    queryset = BlogShare.objects.all()
    serializer_class = BlogShareSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['blog']


class CommentLikeListView(generics.ListAPIView):
    queryset = CommentLike.objects.all()
    serializer_class = CommentLikeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['comment']


# ✅ Recommended Blogs
@api_view(["GET"])
def recommended_blogs(request, blog_id):
    recommended = get_blog_recommendations(blog_id)
    serializer = BlogSerializer(recommended, many=True)
    return Response(serializer.data)


# ✅ Latest Blogs
@api_view(["GET"])
def latest_blog_post(request):
    latest_blogs = Blog.objects.filter(is_published=True).order_by("-created_at")[:3]
    if not latest_blogs:
        return Response({"detail": "No blogs found."}, status=404)
    serializer = BlogSerializer(latest_blogs, many=True)
    return Response(serializer.data)


# ✅ Blog detail (by ID)
@api_view(["GET"])
def blog_detail(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    blog.views += 1
    blog.save(update_fields=["views"])
    serializer = BlogSerializer(blog)
    return Response(serializer.data)


# ✅ Blog detail (by Slug)
@api_view(["GET"])
def blog_detail_slug(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    blog.views += 1
    blog.save(update_fields=["views"])
    serializer = BlogSerializer(blog)
    return Response(serializer.data)