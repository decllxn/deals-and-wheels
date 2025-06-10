from rest_framework import viewsets, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Car,
    Review,
    ReviewSection,
    Rating,
    ReviewComment,
    UserReviewFeedback
)

from .serializers import (
    CarSerializer,
    ReviewSerializer,
    ReviewSectionSerializer,
    RatingSerializer,
    ReviewCommentSerializer,
    UserReviewFeedbackSerializer
)


# 🚗 Car ViewSet
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.select_related('manufacturer').all()
    serializer_class = CarSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['model_name', 'manufacturer__name']
    ordering_fields = ['year']
    ordering = ['year']
    filterset_fields = ['manufacturer__name', 'year']


# 📝 Review ViewSet
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related('car', 'manufacturer', 'author').prefetch_related('sections', 'comments').all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['car__model_name', 'manufacturer__name', 'author__username', 'published_at']
    ordering_fields = ['created_at', 'published_at']
    ordering = ['-created_at']
    search_fields = ['title', 'content']

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# 📊 Review Section ViewSet
class ReviewSectionViewSet(viewsets.ModelViewSet):
    queryset = ReviewSection.objects.select_related('review').all()
    serializer_class = ReviewSectionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['review__car__model_name', 'section_type', 'review__author__username']


# ⭐ Rating ViewSet
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.select_related('review_section', 'user').all()
    serializer_class = RatingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'review_section__review__car__model_name',
        'review_section__section_type',
        'user__username'
    ]


# 💬 Review Comment ViewSet
class ReviewCommentViewSet(viewsets.ModelViewSet):
    queryset = ReviewComment.objects.select_related('review', 'author').all()
    serializer_class = ReviewCommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['review__car__model_name', 'author__username']


# 🧠 User Review Feedback ViewSet
class UserReviewFeedbackViewSet(viewsets.ModelViewSet):
    queryset = UserReviewFeedback.objects.select_related('review', 'user').all()
    serializer_class = UserReviewFeedbackSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['review__car__model_name', 'review__manufacturer__name', 'user__username', 'section']