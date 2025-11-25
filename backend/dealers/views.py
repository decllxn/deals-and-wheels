from rest_framework import (
    viewsets,
    generics,
    status,
    decorators,
    response,
    filters,
    permissions,
)
from django.db.models import Avg, Prefetch
from django.contrib.auth import get_user_model

from .models import Dealer, DealerRating
from .serializers import DealerSerializer, DealerRatingSerializer, DealerSignupSerializer
from car_listings.models import CarListing, CarListingImage, CarListingFeature, CarListingEquipment, CarListingModification, CarListingKnownFlaw, CarListingVideoWalkaround
from car_listings.serializers import CarListingSerializer

User = get_user_model()


# ============================================================
# 1️⃣ Dealer Signup
# ============================================================
class DealerSignupView(generics.CreateAPIView):
    serializer_class = DealerSignupSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        dealer = serializer.save()
        return response.Response(
            {
                "message": "Dealer account created successfully.",
                "dealer": DealerSerializer(dealer, context={"request": request}).data,
            },
            status=status.HTTP_201_CREATED,
        )


# ============================================================
# 2️⃣ Dealer ViewSet
# ============================================================
class DealerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DealerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "address", "description", "website", "company_name"]
    ordering_fields = ["name", "average_rating", "rating_count", "created_at"]
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    def get_queryset(self):
        """Optimized queryset with nested prefetch for car listings."""
        return (
            Dealer.objects.select_related("user")
            .prefetch_related(
                Prefetch(
                    "car_listings",
                    queryset=CarListing.objects.prefetch_related(
                        "images",
                        "features",
                        "equipment",
                        "modifications",
                        "known_flaws",
                        "videos",
                    ).select_related("manufacturer")
                ),
                Prefetch(
                    "ratings",
                    queryset=DealerRating.objects.only("id", "rating")
                ),
            )
            .order_by("-created_at")
        )

    # -----------------------------
    # /api/dealers/me/
    # -----------------------------
    @decorators.action(
        detail=False,
        methods=["get", "patch"],
        url_path="me",
        permission_classes=[permissions.IsAuthenticated],
    )
    def me(self, request):
        try:
            dealer = Dealer.objects.get(user=request.user)
        except Dealer.DoesNotExist:
            return response.Response(
                {"detail": "No dealer profile associated with this account."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.method == "GET":
            serializer = self.get_serializer(dealer, context={"request": request})
            return response.Response(serializer.data)
        elif request.method == "PATCH":
            serializer = self.get_serializer(
                dealer, data=request.data, partial=True, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_200_OK)

    # -----------------------------
    # /api/dealers/<slug>/ratings/
    # -----------------------------
    @decorators.action(detail=True, methods=["get"])
    def ratings(self, request, slug=None):
        dealer = self.get_object()
        ratings = dealer.ratings.select_related("user").all()
        serializer = DealerRatingSerializer(ratings, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    # /api/dealers/<slug>/rate/
    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def rate(self, request, slug=None):
        dealer = self.get_object()
        serializer = DealerRatingSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        rating_obj, created = DealerRating.objects.update_or_create(
            dealer=dealer,
            user=request.user,
            defaults={
                "rating": serializer.validated_data["rating"],
                "comment": serializer.validated_data.get("comment", ""),
            },
        )
        self.update_dealer_rating(dealer)
        return response.Response(
            DealerRatingSerializer(rating_obj).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )

    def update_dealer_rating(self, dealer):
        agg = dealer.ratings.aggregate(avg=Avg("rating"))
        dealer.average_rating = agg["avg"] or 0.0
        dealer.rating_count = dealer.ratings.count()
        dealer.save(update_fields=["average_rating", "rating_count"])


# ============================================================
# 3️⃣ Dealer Ratings (Global)
# ============================================================
class DealerRatingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DealerRating.objects.select_related("dealer", "user").order_by("-created_at")
    serializer_class = DealerRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["dealer__name", "dealer__slug", "user__email", "comment"]
    ordering_fields = ["rating", "created_at"]


# ============================================================
# 4️⃣ Dealer Listings (By Slug)
# ============================================================
class DealerListingsView(generics.ListAPIView):
    serializer_class = CarListingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        return (
            CarListing.objects.filter(dealer__slug=slug)
            .select_related("dealer", "manufacturer")
            .prefetch_related(
                "images",
                "features",
                "equipment",
                "modifications",
                "known_flaws",
                "videos",
            )
            .order_by("-created_at")
        )


# ============================================================
# 5️⃣ My Dealer Listings (Logged-in)
# ============================================================
class MyDealerListingsView(generics.ListAPIView):
    serializer_class = CarListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            dealer = Dealer.objects.get(user=self.request.user)
        except Dealer.DoesNotExist:
            return CarListing.objects.none()

        return (
            CarListing.objects.filter(dealer=dealer)
            .select_related("dealer", "manufacturer")
            .prefetch_related(
                "images",
                "features",
                "equipment",
                "modifications",
                "known_flaws",
                "videos",
            )
            .order_by("-created_at")
        )