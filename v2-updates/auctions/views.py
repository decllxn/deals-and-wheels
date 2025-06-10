from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CarAuction, Review
from .serializers import CarAuctionSerializer, CarAuctionSuggestionSerializer, ReviewSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.utils import timezone
from django.contrib.gis.geoip2 import GeoIP2
from django.contrib.gis.geos import Point
from django.db.models import Prefetch
import logging

logger = logging.getLogger(__name__)

class CarAuctionPagination(PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 100

class CarAuctionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = CarAuction.objects.all().order_by("-created_at")
    serializer_class = CarAuctionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "make", "model", "description", "location"]
    filterset_fields = [
        "transmission", "drivetrain", "fuel_type", "body_style",
        "title_status", "seller_type", "year", "price", "featured"
    ]
    ordering_fields = ["price", "year", "num_bids", "auction_deadline", "mileage"]
    pagination_class = CarAuctionPagination

    def get_queryset(self):
        queryset = CarAuction.objects.all().order_by("-created_at")
        search_term = self.request.query_params.get('search', None)
        if search_term:
            search_fields_to_check = ["title", "make", "model", "description", "location"]
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
            suggestions_queryset = CarAuction.objects.filter(make__icontains=query).distinct('make')[:10] # Increased limit
            suggestions_queryset = suggestions_queryset.prefetch_related('images')
            serializer = CarAuctionSuggestionSerializer(suggestions_queryset, many=True, context={'request': request})
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Error fetching suggestions for query '{query}': {e}", exc_info=True)
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='ending-soon')
    def ending_soon(self, request):
        now = timezone.now()
        queryset = self.get_queryset().filter(auction_deadline__gt=now).order_by('auction_deadline')
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

    @action(detail=False, methods=['get'], url_path='no-reserve')
    def no_reserve(self, request):
        queryset = self.get_queryset().filter(num_bids=0)  # Auctions with no bids are no reserve
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

    @action(detail=False, methods=['get'], url_path='nearest')
    def nearest(self, request):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')

        if not latitude or not longitude:
            return Response({"error": "Latitude and longitude are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_location = Point(float(longitude), float(latitude), srid=4326) # Note the order: longitude, latitude
        except ValueError:
            return Response({"error": "Invalid latitude or longitude format."}, status=status.HTTP_400_BAD_REQUEST)

        # Assuming you have latitude and longitude fields for simplicity in this example:
        queryset = self.get_queryset().exclude(latitude__isnull=True, longitude__isnull=True)
        nearest_cars = sorted(queryset, key=lambda car: self.calculate_distance(user_location, car.longitude, car.latitude))

        page = self.paginate_queryset(nearest_cars)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(nearest_cars, many=True)
        return Response(serializer.data)

    def calculate_distance(self, user_location, car_lon, car_lat):
        if car_lon is None or car_lat is None:
            return float('inf') # Treat cars without coordinates as infinitely far
        car_location = Point(float(car_lon), float(car_lat), srid=4326)
        return user_location.distance(car_location) # Requires GeoDjango

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['auction', 'user', 'rating']
    ordering_fields = ['rating', 'created_at']
    search_fields = ['comment', 'user__email'] # Assuming your User model has an email field

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # Automatically associate review with the logged-in user