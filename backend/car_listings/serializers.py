# vehicles/serializers.py
from rest_framework import serializers
from django.conf import settings
from django.utils import timezone

from .models import (
    CarListing,
    CarListingImage,
    CarListingFeature,
    CarListingEquipment,
    CarListingModification,
    CarListingKnownFlaw,
    CarListingVideoWalkaround,
)
from dealers.models import Dealer
from manufacturers.models import Manufacturer


# ---------------------------------
# Dealer Serializer
# ---------------------------------
class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = [
            "id",
            "name",
            "address",
            "website",
            "logo",
            "description",
            "is_verified",
            "verification_date",
            "average_rating",
            "rating_count",
            "cars_sold_count",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {field: {"required": False} for field in fields}


# ---------------------------------
# Manufacturer Serializer
# ---------------------------------
class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ["id", "name", "slug", "logo"]


# ---------------------------------
# Related Serializers
# ---------------------------------
class CarListingImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image}"
        return None

    class Meta:
        model = CarListingImage
        fields = ["id", "image", "uploaded_at"]


class CarListingFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingFeature
        fields = ["id", "name"]


class CarListingEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingEquipment
        fields = ["id", "name"]


class CarListingModificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingModification
        fields = ["id", "name"]


class CarListingKnownFlawSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingKnownFlaw
        fields = ["id", "description"]


class CarListingVideoWalkaroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingVideoWalkaround
        fields = ["id", "video_url"]


# ---------------------------------
# Main CarListing Serializer
# ---------------------------------
class CarListingSerializer(serializers.ModelSerializer):
    dealer = DealerSerializer(read_only=True)
    manufacturer = ManufacturerSerializer(read_only=True)
    images = CarListingImageSerializer(many=True, read_only=True)
    features = CarListingFeatureSerializer(many=True, required=False)
    equipment = CarListingEquipmentSerializer(many=True, required=False)
    modifications = CarListingModificationSerializer(many=True, required=False)
    known_flaws = CarListingKnownFlawSerializer(many=True, required=False)
    videos = CarListingVideoWalkaroundSerializer(many=True, required=False)
    seller = serializers.StringRelatedField(read_only=True)

    # For file uploads (write-only)
    image_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
        help_text="Upload multiple car images."
    )

    # Write support for manufacturer via ID
    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source="manufacturer",
        write_only=True,
        required=False,
    )

    class Meta:
        model = CarListing
        fields = "__all__"
        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "updated_at",
            "seller",
            "dealer",
        ]

    # ---------------------------------
    # CREATE
    # ---------------------------------
    def create(self, validated_data):
        """
        Automatically attach logged-in user and Dealer.
        Create nested and image relations.
        """
        request = self.context.get("request")
        user = request.user if request else None

        # Pop related data
        image_files = validated_data.pop("image_files", [])
        features_data = validated_data.pop("features", [])
        equipment_data = validated_data.pop("equipment", [])
        modifications_data = validated_data.pop("modifications", [])
        known_flaws_data = validated_data.pop("known_flaws", [])
        videos_data = validated_data.pop("videos", [])

        # Attach seller/dealer
        if user and user.is_authenticated:
            validated_data["seller"] = user
            dealer = Dealer.objects.filter(user=user).first()
            if dealer:
                validated_data["dealer"] = dealer

        # Create main listing
        car_listing = CarListing.objects.create(**validated_data)

        # Related models
        for feature in features_data:
            CarListingFeature.objects.create(car_listing=car_listing, **feature)
        for eq in equipment_data:
            CarListingEquipment.objects.create(car_listing=car_listing, **eq)
        for mod in modifications_data:
            CarListingModification.objects.create(car_listing=car_listing, **mod)
        for flaw in known_flaws_data:
            CarListingKnownFlaw.objects.create(car_listing=car_listing, **flaw)
        for vid in videos_data:
            CarListingVideoWalkaround.objects.create(car_listing=car_listing, **vid)
        for image in image_files:
            CarListingImage.objects.create(car_listing=car_listing, image=image)

        return car_listing

    # ---------------------------------
    # UPDATE
    # ---------------------------------
    def update(self, instance, validated_data):
        image_files = validated_data.pop("image_files", [])
        features_data = validated_data.pop("features", None)
        equipment_data = validated_data.pop("equipment", None)
        modifications_data = validated_data.pop("modifications", None)
        known_flaws_data = validated_data.pop("known_flaws", None)
        videos_data = validated_data.pop("videos", None)

        instance = super().update(instance, validated_data)

        def refresh_related(manager, model, data_list):
            manager.all().delete()
            for data in data_list:
                model.objects.create(car_listing=instance, **data)

        if features_data is not None:
            refresh_related(instance.features, CarListingFeature, features_data)
        if equipment_data is not None:
            refresh_related(instance.equipment, CarListingEquipment, equipment_data)
        if modifications_data is not None:
            refresh_related(instance.modifications, CarListingModification, modifications_data)
        if known_flaws_data is not None:
            refresh_related(instance.known_flaws, CarListingKnownFlaw, known_flaws_data)
        if videos_data is not None:
            refresh_related(instance.videos, CarListingVideoWalkaround, videos_data)

        # Add new images if provided
        for image in image_files:
            CarListingImage.objects.create(car_listing=instance, image=image)

        return instance


# ---------------------------------
# Lite Serializer (Suggestions / Cards)
# ---------------------------------
class CarListingSuggestionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    manufacturer_name = serializers.CharField(source="manufacturer.name", read_only=True)

    class Meta:
        model = CarListing
        fields = ["id", "slug", "make", "model", "manufacturer_name", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        primary_image = obj.images.first()
        if primary_image and primary_image.image:
            if request:
                return request.build_absolute_uri(primary_image.image.url)
            return f"{settings.MEDIA_URL}{primary_image.image}"
        return None