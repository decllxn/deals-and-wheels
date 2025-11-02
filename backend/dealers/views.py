# dealers/views.py
from rest_framework import viewsets, generics, status, decorators, response, filters, permissions
from django.db.models import Avg
from django.contrib.auth import get_user_model

from .models import Dealer, DealerRating
from .serializers import DealerSerializer, DealerRatingSerializer, DealerSignupSerializer
from car_listings.models import CarListing
from car_listings.serializers import CarListingSerializer

User = get_user_model()


# ============================================================
# 1️⃣ Dealer Signup View
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
class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all().order_by("-created_at")
    serializer_class = DealerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "address", "description", "website"]
    ordering_fields = [
        "name",
        "average_rating",
        "rating_count",
        "cars_listed_count",
        "cars_sold_count",
        "created_at",
    ]

    lookup_field = "name"
    lookup_url_kwarg = "name"

    # -----------------------------
    # Dealer Ratings
    # -----------------------------
    @decorators.action(detail=True, methods=["get"])
    def ratings(self, request, name=None):
        dealer = self.get_object()
        ratings = dealer.ratings.all()
        serializer = DealerRatingSerializer(ratings, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def rate(self, request, name=None):
        dealer = self.get_object()
        serializer = DealerRatingSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
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
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_dealer_rating(self, dealer):
        agg = dealer.ratings.aggregate(avg=Avg("rating"))
        dealer.average_rating = agg["avg"] or 0.0
        dealer.rating_count = dealer.ratings.count()
        dealer.save(update_fields=["average_rating", "rating_count"])


# ============================================================
# 3️⃣ Dealer Rating ViewSet
# ============================================================
class DealerRatingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DealerRating.objects.select_related("dealer", "user").order_by("-created_at")
    serializer_class = DealerRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["dealer__name", "user__email", "comment"]
    ordering_fields = ["rating", "created_at"]


# ============================================================
# 4️⃣ Dealer Listings (for a specific dealer)
# ============================================================
class DealerListingsView(generics.ListAPIView):
    """
    Returns all car listings for a specific dealer.
    Example: /api/dealers/5/listings/
    """
    serializer_class = CarListingSerializer
    permission_classes = [permissions.AllowAny]  # or IsAuthenticated if needed

    def get_queryset(self):
        dealer_id = self.kwargs.get("dealer_id")
        return CarListing.objects.filter(dealer_id=dealer_id).select_related("dealer", "manufacturer")


# ============================================================
# 5️⃣ Logged-in Dealer's Listings (for dealer dashboard)
# ============================================================
class MyDealerListingsView(generics.ListAPIView):
    """
    Returns listings for the currently authenticated dealer.
    Example: /api/dealers/my/listings/
    """
    serializer_class = CarListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, "dealer_profile"):
            return CarListing.objects.filter(dealer=user.dealer_profile).select_related("dealer", "manufacturer")
        return CarListing.objects.none()