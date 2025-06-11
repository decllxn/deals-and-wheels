from rest_framework import viewsets, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Car, Review
from .serializers import (
    CarSerializer,
    ReviewListSerializer,
    ReviewDetailSerializer
)


# 🚗 Car ViewSet
class CarViewSet(viewsets.ReadOnlyModelViewSet):  # ReadOnly — no need to create from frontend
    queryset = Car.objects.select_related('manufacturer').all()
    serializer_class = CarSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['model_name', 'manufacturer__name']
    ordering_fields = ['year']
    ordering = ['-year']
    filterset_fields = ['manufacturer__name', 'year']


# 📝 Review ViewSet
class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.select_related('car', 'manufacturer', 'author').all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['manufacturer__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    search_fields = ['title', 'content']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ReviewDetailSerializer
        return ReviewListSerializer