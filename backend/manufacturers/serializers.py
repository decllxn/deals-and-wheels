from rest_framework import serializers
from manufacturers.models import Manufacturer
from blogs.serializers import BlogSerializer
from car_listings.serializers import CarListingSerializer


class ManufacturerSerializer(serializers.ModelSerializer):
    """Base serializer for basic CRUD or display"""
    class Meta:
        model = Manufacturer
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'image',
            'logo',
            'website',
            'country',
            'founded_year',
            'created_at',
            'updated_at',
            'history',
            'achievements',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ManufacturerListSerializer(serializers.ModelSerializer):
    """Lightweight version for listings, dropdowns, etc."""
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'slug', 'logo', 'image']


class ManufacturerDetailSerializer(serializers.ModelSerializer):
    """Full detail with nested related content"""

    blogs = BlogSerializer(many=True, read_only=True)
    car_listings = CarListingSerializer(many=True, read_only=True)

    class Meta:
        model = Manufacturer
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'image',
            'logo',
            'website',
            'country',
            'founded_year',
            'created_at',
            'updated_at',
            'blogs',
            'car_listings',
            'history',
            'achievements',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']