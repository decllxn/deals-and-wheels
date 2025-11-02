# car_listings/filters.py
import django_filters
from django_filters import FilterSet, NumberFilter, CharFilter, ChoiceFilter, ModelChoiceFilter
from .models import CarListing
from dealers.models import Dealer


class CarListingFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    year = NumberFilter()

    # Keep exact or contains for single values
    model = CharFilter(field_name='model', lookup_expr='icontains')
    location = CharFilter(field_name='location', lookup_expr='icontains')

    # ✅ Multi-value support (comma-separated or repeated)
    make = CharFilter(method="filter_multi_value")
    fuel_type = CharFilter(method="filter_multi_value")
    body_style = CharFilter(method="filter_multi_value")
    transmission = CharFilter(method="filter_multi_value")
    seller_type = CharFilter(method="filter_multi_value")

    dealer = ModelChoiceFilter(queryset=Dealer.objects.all())
    has_warranty = django_filters.BooleanFilter(field_name="has_warranty")
    is_featured = django_filters.BooleanFilter(field_name="is_featured")  # ✅ BooleanFilter

    class Meta:
        model = CarListing
        fields = [
            'make', 'model', 'year', 'transmission',
            'fuel_type', 'body_style', 'seller_type',
            'dealer', 'location', 'has_warranty',
            'is_featured', 'min_price', 'max_price'
        ]

    def filter_multi_value(self, queryset, name, value):
        """
        Allows both:
        - ?fuel_type=Hybrid,Petrol
        - ?fuel_type=Hybrid&fuel_type=Petrol
        """
        if not value:
            return queryset

        # Collect repeated params (?param=A&param=B)
        values = self.request.GET.getlist(name)
        if not values:
            # Fallback: comma-separated (?param=A,B)
            values = value.split(",")

        return queryset.filter(**{f"{name}__in": values})