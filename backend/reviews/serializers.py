from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Car,
    Review,
    ReviewSection,
    Rating,
    ReviewComment,
    UserReviewFeedback
)
from manufacturers.models import Manufacturer
from manufacturers.serializers import ManufacturerListSerializer

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


class ReviewSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewSection
        fields = ['id', 'section_type', 'description', 'rating']


class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'review_section', 'user', 'score']


class ReviewCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = ReviewComment
        fields = ['id', 'review', 'author', 'content', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)
    car_id = serializers.PrimaryKeyRelatedField(
        queryset=Car.objects.all(),
        source='car',
        write_only=True
    )
    manufacturer = ManufacturerMiniSerializer(read_only=True)
    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True,
        required=False
    )
    author = UserSerializer(read_only=True)
    sections = ReviewSectionSerializer(many=True, read_only=True)
    comments = ReviewCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'car', 'car_id', 'manufacturer', 'manufacturer_id', 'author',
            'title', 'content', 'created_at', 'published_at', 'overall_rating',
            'sections', 'comments'
        ]
        read_only_fields = ['created_at', 'slug']


class UserReviewFeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    review = ReviewSerializer(read_only=True)
    review_id = serializers.PrimaryKeyRelatedField(
        queryset=Review.objects.all(),
        source='review',
        write_only=True
    )

    class Meta:
        model = UserReviewFeedback
        fields = ['id', 'review', 'review_id', 'user', 'section', 'rating', 'feedback']