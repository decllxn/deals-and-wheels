# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from car_listings.models import CarListing
from dealers.models import Dealer
from car_listings.serializers import CarListingSerializer
from dealers.serializers import DealerSerializer

class GlobalSearchView(APIView):
    """
    Single endpoint to search across Car Listings and Dealers
    """
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', None)
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=400)

        # Search Cars
        car_results = CarListing.objects.filter(
            Q(title__icontains=query) |
            Q(make__icontains=query) |
            Q(model__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query)
        ).select_related("dealer")[:10]  # limit for performance

        # Search Dealers
        dealer_results = Dealer.objects.filter(
            Q(name__icontains=query) |
            Q(address__icontains=query) |
            Q(description__icontains=query)
        )[:10]

        return Response({
            "cars": CarListingSerializer(car_results, many=True, context={'request': request}).data,
            "dealers": DealerSerializer(dealer_results, many=True, context={'request': request}).data
        })
