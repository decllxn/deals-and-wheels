from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Car, Review
from manufacturers.models import Manufacturer
from manufacturers.serializers import ManufacturerListSerializer  # assuming this exists

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class ManufacturerMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'slug', 'logo']


class CarSerializer(serializers.ModelSerializer):
    manufacturer = ManufacturerMiniSerializer(read_only=True)
    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True,
        required=False
    )

    class Meta:
        model = Car
        fields = ['id', 'manufacturer', 'manufacturer_id', 'model_name', 'year', 'image', 'slug']
        read_only_fields = ['slug']


class ReviewListSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)
    manufacturer = ManufacturerMiniSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'slug', 'title', 'summary', 'overall_rating', 'created_at', 'manufacturer', 'car']


class ReviewDetailSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)
    manufacturer = ManufacturerMiniSerializer(read_only=True)
    author = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'slug', 'title', 'summary', 'content', 'overall_rating',
            'created_at', 'published_at', 'car', 'manufacturer', 'author'
        ]
        read_only_fields = ['slug', 'created_at']