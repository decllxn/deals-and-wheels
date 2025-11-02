# vehicles/views.py
from rest_framework import viewsets, status, filters as rf_filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
import logging

from .models import (
    CarListing,
    CarListingImage,
    CarListingFeature,
    CarListingEquipment,
    CarListingModification,
    CarListingKnownFlaw,
    CarListingVideoWalkaround,
)
from .serializers import (
    CarListingSerializer,
    CarListingImageSerializer,
    CarListingFeatureSerializer,
    CarListingEquipmentSerializer,
    CarListingModificationSerializer,
    CarListingKnownFlawSerializer,
    CarListingVideoWalkaroundSerializer,
    CarListingSuggestionSerializer,
)
from .filters import CarListingFilter  # optional — you can add later
from . import utils  # optional — for search analytics, similar listings, etc.

logger = logging.getLogger(__name__)


# ----------------------------------------
# Pagination
# ----------------------------------------
class CarListingPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = "page_size"
    max_page_size = 100


# ----------------------------------------
# Car Listing ViewSet
# ----------------------------------------
class CarListingViewSet(viewsets.ModelViewSet):
    """
    A full CRUD ViewSet for Car Listings with filtering, ordering, and search.
    """
    queryset = (
        CarListing.objects.all()
        .select_related("manufacturer", "dealer", "seller")
        .prefetch_related("images", "features", "equipment", "modifications", "known_flaws", "videos")
        .order_by("-created_at")
    )
    serializer_class = CarListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CarListingPagination

    # Filters and ordering
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    filterset_class = CarListingFilter  # optional
    search_fields = ["title", "make", "model", "description", "location"]
    ordering_fields = ["price", "year", "created_at", "mileage"]
    ordering = ["-created_at"]
    lookup_field = "slug"

    # ----------------------------------------
    # Context
    # ----------------------------------------
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    # ----------------------------------------
    # Object retrieval (safe slug support)
    # ----------------------------------------
    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field)
        if lookup_value and lookup_value.rsplit("-", 1)[-1].isdigit():
            listing_id = lookup_value.rsplit("-", 1)[-1]
            base_slug = lookup_value.rsplit("-", 1)[0]
            return get_object_or_404(CarListing, id=listing_id, slug__startswith=base_slug)
        return super().get_object()

    # ----------------------------------------
    # Creation
    # ----------------------------------------
    def perform_create(self, serializer):
        """
        Automatically assigns the logged-in user as seller (and dealer if exists)
        """
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(seller=user)
        logger.info(f"✅ New listing created by {user}: {serializer.instance.slug}")

    # ----------------------------------------
    # Queryset filtering with search tracking
    # ----------------------------------------
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get("search")

        if search_term:
            if hasattr(utils, "track_search"):
                utils.track_search(search_term)
            q = Q()
            for field in self.search_fields:
                q |= Q(**{f"{field}__icontains": search_term})
            queryset = queryset.filter(q)

        return queryset

    # ----------------------------------------
    # Pagination Helper
    # ----------------------------------------
    def _paginate_response(self, queryset):
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page or queryset, many=True)
        return self.get_paginated_response(serializer.data) if page else Response(serializer.data)

    # ----------------------------------------
    # Custom Actions
    # ----------------------------------------
    @action(detail=True, methods=["get"], url_path="similar")
    def similar_listings(self, request, slug=None):
        car = self.get_object()
        if hasattr(utils, "get_similar_listings"):
            similar = utils.get_similar_listings(car, limit=8)
        else:
            similar = (
                CarListing.objects.filter(make__iexact=car.make)
                .exclude(id=car.id)
                .order_by("-created_at")[:8]
            )
        serializer = CarListingSuggestionSerializer(similar, many=True, context={"request": request})
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="featured")
    def featured_listings(self, request):
        return self._paginate_response(self.get_queryset().filter(is_featured=True))

    @action(detail=False, methods=["get"], url_path="recent")
    def recent_listings(self, request):
        return self._paginate_response(self.get_queryset().order_by("-created_at"))

    @action(detail=False, methods=["get"], url_path="lowest-price")
    def lowest_price(self, request):
        return self._paginate_response(self.get_queryset().order_by("price"))

    @action(detail=False, methods=["get"], url_path="highest-price")
    def highest_price(self, request):
        return self._paginate_response(self.get_queryset().order_by("-price"))

    @action(detail=False, methods=["get"], url_path="lowest-mileage")
    def lowest_mileage(self, request):
        return self._paginate_response(self.get_queryset().order_by("mileage"))

    
    @action(detail=False, methods=["get"], url_path="search")
    def search_listings(self, request):
        query = request.query_params.get("q")
        if not query:
            return Response({"detail": "Missing search query."}, status=status.HTTP_400_BAD_REQUEST)

        q = Q()
        for field in self.search_fields:
            q |= Q(**{f"{field}__icontains": query})

        results = self.get_queryset().filter(q)
        if not results.exists():
            return Response({"detail": "No results found."}, status=status.HTTP_404_NOT_FOUND)

        page = self.paginate_queryset(results)
        serializer = self.get_serializer(page or results, many=True)
        return self.get_paginated_response(serializer.data) if page else Response(serializer.data)


# ----------------------------------------
# Related Models ViewSets
# ----------------------------------------
class BaseCarListingRelatedViewSet(viewsets.ModelViewSet):
    """
    Base class for related model viewsets
    """
    filter_backends = [DjangoFilterBackend, rf_filters.SearchFilter, rf_filters.OrderingFilter]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["name"]
    filterset_fields = ["car_listing"]


class CarListingImageViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingImage.objects.all().order_by("-uploaded_at")
    serializer_class = CarListingImageSerializer


class CarListingFeatureViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingFeature.objects.all()
    serializer_class = CarListingFeatureSerializer


class CarListingEquipmentViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingEquipment.objects.all()
    serializer_class = CarListingEquipmentSerializer


class CarListingModificationViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingModification.objects.all()
    serializer_class = CarListingModificationSerializer


class CarListingKnownFlawViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingKnownFlaw.objects.all()
    serializer_class = CarListingKnownFlawSerializer
    search_fields = ["description"]


class CarListingVideoWalkaroundViewSet(BaseCarListingRelatedViewSet):
    queryset = CarListingVideoWalkaround.objects.all()
    serializer_class = CarListingVideoWalkaroundSerializer
    search_fields = ["video_url"]


# ----------------------------------------
# Popular Tags / Suggestions (optional)
# ----------------------------------------
class PopularTagsView(APIView):
    def get(self, request, *args, **kwargs):
        if hasattr(utils, "get_popular_searches"):
            tags = utils.get_popular_searches(limit=10)
        else:
            tags = []
        return Response([{"label": t.title()} for t in tags], status=status.HTTP_200_OK)