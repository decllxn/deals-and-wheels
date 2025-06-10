from rest_framework import viewsets, permissions, filters, generics
from .models import Guide, GuideCategory, Hashtag
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import GuideSerializer, GuideCategorySerializer, HashtagSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .utils import get_ranked_guides


class GuideViewSet(viewsets.ModelViewSet):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['guide_type', 'category', 'difficulty_level', 'published', 'related_brands']
    search_fields = ['title', 'excerpt', 'content', 'hashtags__name']
    ordering_fields = ['publish_date', 'created_at', 'views', 'likes', 'shares']
    ordering = ['-publish_date']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class GuideCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GuideCategory.objects.all()
    serializer_class = GuideCategorySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

class HashtagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

class LatestGuidesView(generics.ListAPIView):
    queryset = Guide.objects.filter(published=True).order_by('-publish_date')[:10]  # Adjust limit as needed
    serializer_class = GuideSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]


class FeedView(APIView):
    def get(self, request):
        ranked_guides = get_ranked_guides()
        serializer = GuideSerializer(ranked_guides, many=True)
        return Response(serializer.data)