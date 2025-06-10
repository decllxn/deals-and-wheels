from rest_framework import viewsets, decorators, response, status, filters
from .models import Dealer, DealerRating
from .serializers import DealerSerializer, DealerRatingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.db.models import Avg, Count

class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all().order_by('name')
    serializer_class = DealerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'address', 'phone_number', 'email', 'description']
    ordering_fields = ['name', 'average_rating', 'rating_count', 'car_count', 'created_at', 'updated_at']

    @decorators.action(detail=True, methods=['get'])
    def ratings(self, request, pk=None):
        """Get all ratings for a specific dealer."""
        try:
            dealer = self.get_object()
        except Dealer.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        ratings = dealer.ratings.all()
        serializer = DealerRatingSerializer(ratings, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def rate(self, request, pk=None):
        """Rate a specific dealer."""
        try:
            dealer = self.get_object()
        except Dealer.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        serializer = DealerRatingSerializer(data=request.data)
        if serializer.is_valid():
            try:
                rating = DealerRating.objects.get(dealer=dealer, user=request.user)
                # User has already rated, update their existing rating
                serializer.update(rating, serializer.validated_data)
                self.update_dealer_rating(dealer)
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            except DealerRating.DoesNotExist:
                # User hasn't rated yet, create a new rating
                serializer.save(dealer=dealer, user=request.user)
                self.update_dealer_rating(dealer)
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_dealer_rating(self, dealer):
        """Calculate and update the average rating and rating count for a dealer."""
        average = dealer.ratings.all().aggregate(Avg('rating'))['rating__avg']
        count = dealer.ratings.count()
        dealer.average_rating = average if average is not None else 0.0
        dealer.rating_count = count
        dealer.save()

class DealerRatingViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only viewset for dealer ratings (optional, for listing all ratings)."""
    queryset = DealerRating.objects.all()
    serializer_class = DealerRatingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['dealer__name', 'user__username', 'comment']
    ordering_fields = ['dealer__name', 'user__username', 'rating', 'created_at']