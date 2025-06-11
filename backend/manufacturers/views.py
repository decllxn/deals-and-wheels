from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Manufacturer
from .serializers import (
    ManufacturerSerializer,
    ManufacturerListSerializer,
    ManufacturerDetailSerializer,
)

from blogs.models import Blog
from blogs.serializers import BlogSerializer

from car_listings.models import CarListing
from car_listings.serializers import CarListingSerializer

from news_articles.models import NewsItem
from news_articles.serializers import NewsItemSerializer

from reviews.models import Review
from reviews.serializers import ReviewListSerializer  # ✅ updated import


class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all().order_by("name")
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['country', 'founded_year']
    search_fields = ['name', 'country']
    ordering_fields = ['name', 'founded_year', 'created_at']
    ordering = ['name']
    
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == "list":
            return ManufacturerListSerializer
        elif self.action == "retrieve":
            return ManufacturerDetailSerializer
        return ManufacturerSerializer

    @action(detail=True, methods=['get'], url_path='blogs')
    def blogs(self, request, slug=None):
        manufacturer = self.get_object()
        blogs = Blog.objects.filter(manufacturer=manufacturer, is_published=True)
        serializer = BlogSerializer(blogs, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='listings')
    def listings(self, request, slug=None):
        manufacturer = self.get_object()
        listings = CarListing.objects.filter(manufacturer=manufacturer)
        serializer = CarListingSerializer(listings, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='news')
    def news(self, request, slug=None):
        manufacturer = self.get_object()
        news_items = NewsItem.objects.filter(manufacturer=manufacturer).order_by('-published_at')
        serializer = NewsItemSerializer(news_items, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='reviews')
    def reviews(self, request, slug=None):
        manufacturer = self.get_object()
        reviews = Review.objects.filter(manufacturer=manufacturer).order_by('-created_at')
        serializer = ReviewListSerializer(reviews, many=True, context={'request': request})  # ✅ updated
        return Response(serializer.data)