from rest_framework import generics, filters as rf_filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    CarListing, CarListingImage, CarListingFeature, CarListingEquipment,
    CarListingModification, CarListingKnownFlaw, CarListingVideoWalkaround
)
from .serializers import (
    CarListingSerializer, CarListingImageSerializer, CarListingFeatureSerializer,
    CarListingEquipmentSerializer, CarListingModificationSerializer,
    CarListingKnownFlawSerializer, CarListingVideoWalkaroundSerializer,
    CarListingSuggestionSerializer
)
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, NumberFilter, CharFilter, ChoiceFilter, ModelChoiceFilter
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from dealers.models import Dealer
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class CarListingPagination(PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 100

class CarListingFilter(FilterSet):
    price__gte = NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = NumberFilter(field_name='price', lookup_expr='lte')
    make = CharFilter(lookup_expr='iexact')
    model = CharFilter(lookup_expr='icontains')
    year = NumberFilter()
    transmission = ChoiceFilter(choices=CarListing.TRANSMISSION_CHOICES)
    fuel_type = ChoiceFilter(choices=CarListing.FUEL_TYPE_CHOICES)
    body_style = ChoiceFilter(choices=CarListing.BODY_STYLE_CHOICES)
    seller_type = ChoiceFilter(choices=CarListing.SELLER_TYPE_CHOICES)
    dealer = ModelChoiceFilter(queryset=Dealer.objects.all())
    location = CharFilter(lookup_expr='icontains')
    has_warranty = ChoiceFilter(choices=[(True, 'Yes'), (False, 'No')])
    is_featured = ChoiceFilter(choices=[(True, 'Yes'), (False, 'No')])

    class Meta:
        model = CarListing
        fields = ['make', 'model', 'year', 'transmission', 'fuel_type', 'body_style', 'price__gte', 'price__lte', 'seller_type', 'dealer', 'location', 'has_warranty']

class CarListingViewSet(viewsets.ModelViewSet):
    queryset = CarListing.objects.all().order_by("-created_at")
    serializer_class = CarListingSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_class = CarListingFilter
    search_fields = ['title', 'make', 'model', 'description', 'location']
    ordering_fields = ['price', '-price', 'year', '-year', 'created_at', '-created_at', 'mileage']
    pagination_class = CarListingPagination

    def get_queryset(self):
        queryset = CarListing.objects.all().order_by("-created_at")
        search_term = self.request.query_params.get('search', None)
        if search_term:
            search_fields_to_check = ['title', 'make', 'model', 'description', 'location']
            q_objects = Q()
            for field_name in search_fields_to_check:
                q_objects |= Q(**{f"{field_name}__icontains": search_term})
            queryset = queryset.filter(q_objects)
        queryset = queryset.prefetch_related('images') # Optimize for image retrieval
        return queryset

    @action(detail=False, methods=['get'], url_path='suggestions')
    def suggestions(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response([])

        try:
            suggestions_queryset = CarListing.objects.filter(make__icontains=query).distinct('make')[:10] # Increased limit
            suggestions_queryset = suggestions_queryset.prefetch_related('images')
            serializer = CarListingSuggestionSerializer(suggestions_queryset, many=True, context={'request': request})
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Error fetching car listing suggestions for query '{query}': {e}", exc_info=True)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        queryset = self.get_queryset().filter(is_featured=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='new-listings')
    def new_listings(self, request):
        queryset = self.get_queryset().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='lowest-price')
    def lowest_price(self, request):
        queryset = self.get_queryset().order_by('price')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='highest-price')
    def highest_price(self, request):
        queryset = self.get_queryset().order_by('-price')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='lowest-mileage')
    def lowest_mileage(self, request):
        queryset = self.get_queryset().order_by('mileage')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CarListingImageViewSet(viewsets.ModelViewSet):
    queryset = CarListingImage.objects.all()
    serializer_class = CarListingImageSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing']
    search_fields = ['car_listing__make', 'car_listing__model']
    ordering_fields = ['created_at']

class CarListingFeatureViewSet(viewsets.ModelViewSet):
    queryset = CarListingFeature.objects.all()
    serializer_class = CarListingFeatureSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing', 'name']
    search_fields = ['name']
    ordering_fields = ['name']

class CarListingEquipmentViewSet(viewsets.ModelViewSet):
    queryset = CarListingEquipment.objects.all()
    serializer_class = CarListingEquipmentSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing', 'name']
    search_fields = ['name']
    ordering_fields = ['name']

class CarListingModificationViewSet(viewsets.ModelViewSet):
    queryset = CarListingModification.objects.all()
    serializer_class = CarListingModificationSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing', 'name']
    search_fields = ['name']
    ordering_fields = ['name']

class CarListingKnownFlawViewSet(viewsets.ModelViewSet):
    queryset = CarListingKnownFlaw.objects.all()
    serializer_class = CarListingKnownFlawSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing']
    search_fields = ['description']
    ordering_fields = ['id']

class CarListingVideoWalkaroundViewSet(viewsets.ModelViewSet):
    queryset = CarListingVideoWalkaround.objects.all()
    serializer_class = CarListingVideoWalkaroundSerializer
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_fields = ['car_listing']
    search_fields = ['video_url']
    ordering_fields = ['id']