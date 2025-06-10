from rest_framework import serializers
from .models import (
    CarListing, CarListingImage, CarListingFeature, CarListingEquipment,
    CarListingModification, CarListingKnownFlaw, CarListingVideoWalkaround
)
from django.conf import settings
from dealers.models import Dealer
from manufacturers.models import Manufacturer

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = ['id', 'name']

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'slug', 'logo']


class CarListingImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(f"{settings.MEDIA_URL}{obj.image}")
        return None

    class Meta:
        model = CarListingImage
        fields = ["id", "image", "car_listing"]


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


class CarListingSerializer(serializers.ModelSerializer):
    dealer = DealerSerializer(read_only=True)
    images = CarListingImageSerializer(many=True, read_only=True)
    features = CarListingFeatureSerializer(many=True)
    equipment = CarListingEquipmentSerializer(many=True)
    modifications = CarListingModificationSerializer(many=True)
    known_flaws = CarListingKnownFlawSerializer(many=True)
    videos = CarListingVideoWalkaroundSerializer(many=True)
    seller = serializers.StringRelatedField(read_only=True)  # Make seller read-only

    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True
    )

    class Meta:
        model = CarListing
        fields = '__all__'
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        features_data = validated_data.pop('features', [])
        equipment_data = validated_data.pop('equipment', [])
        modifications_data = validated_data.pop('modifications', [])
        known_flaws_data = validated_data.pop('known_flaws', [])
        videos_data = validated_data.pop('videos', [])

        car_listing = CarListing.objects.create(**validated_data)

        for feature_data in features_data:
            CarListingFeature.objects.create(car_listing=car_listing, **feature_data)
        for equipment_data in equipment_data:
            CarListingEquipment.objects.create(car_listing=car_listing, **equipment_data)
        for modification_data in modifications_data:
            CarListingModification.objects.create(car_listing=car_listing, **modification_data)
        for known_flaw_data in known_flaws_data:
            CarListingKnownFlaw.objects.create(car_listing=car_listing, **known_flaw_data)
        for video_data in videos_data:
            CarListingVideoWalkaround.objects.create(car_listing=car_listing, **video_data)

        return car_listing

    def update(self, instance, validated_data):
        features_data = validated_data.pop('features', None)
        equipment_data = validated_data.pop('equipment', None)
        modifications_data = validated_data.pop('modifications', None)
        known_flaws_data = validated_data.pop('known_flaws', None)
        videos_data = validated_data.pop('videos', None)

        instance = super().update(instance, validated_data)

        if features_data is not None:
            instance.features.all().delete()
            for feature_data in features_data:
                CarListingFeature.objects.create(car_listing=instance, **feature_data)

        if equipment_data is not None:
            instance.equipment.all().delete()
            for equipment_data in equipment_data:
                CarListingEquipment.objects.create(car_listing=instance, **equipment_data)
from rest_framework import serializers
from .models import (
    CarListing, CarListingImage, CarListingFeature, CarListingEquipment,
    CarListingModification, CarListingKnownFlaw, CarListingVideoWalkaround
)
from django.conf import settings
from dealers.models import Dealer
from manufacturers.models import Manufacturer

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = ['id', 'name']

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'slug', 'logo']

class CarListingImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(f"{settings.MEDIA_URL}{obj.image}")
        return None

    class Meta:
        model = CarListingImage
        fields = ["id", "image", "car_listing"]

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

class CarListingSerializer(serializers.ModelSerializer):
    dealer = DealerSerializer(read_only=True)
    images = CarListingImageSerializer(many=True, read_only=True)
    features = CarListingFeatureSerializer(many=True)
    equipment = CarListingEquipmentSerializer(many=True)
    modifications = CarListingModificationSerializer(many=True)
    known_flaws = CarListingKnownFlawSerializer(many=True)
    videos = CarListingVideoWalkaroundSerializer(many=True)
    seller = serializers.StringRelatedField(read_only=True)  

    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True
    )

    class Meta:
        model = CarListing
        fields = '__all__'
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        features_data = validated_data.pop('features', [])
        equipment_data = validated_data.pop('equipment', [])
        modifications_data = validated_data.pop('modifications', [])
        known_flaws_data = validated_data.pop('known_flaws', [])
        videos_data = validated_data.pop('videos', [])

        car_listing = CarListing.objects.create(**validated_data)

        for feature_data in features_data:
            CarListingFeature.objects.create(car_listing=car_listing, **feature_data)
        for equipment_data in equipment_data:
            CarListingEquipment.objects.create(car_listing=car_listing, **equipment_data)
        for modification_data in modifications_data:
            CarListingModification.objects.create(car_listing=car_listing, **modification_data)
        for known_flaw_data in known_flaws_data:
            CarListingKnownFlaw.objects.create(car_listing=car_listing, **known_flaw_data)
        for video_data in videos_data:
            CarListingVideoWalkaround.objects.create(car_listing=car_listing, **video_data)

        return car_listing

    def update(self, instance, validated_data):
        features_data = validated_data.pop('features', None)
        equipment_data = validated_data.pop('equipment', None)
        modifications_data = validated_data.pop('modifications', None)
        known_flaws_data = validated_data.pop('known_flaws', None)
        videos_data = validated_data.pop('videos', None)

        instance = super().update(instance, validated_data)

        if features_data is not None:
            instance.features.all().delete()
            for feature_data in features_data:
                CarListingFeature.objects.create(car_listing=instance, **feature_data)

        if equipment_data is not None:
            instance.equipment.all().delete()
            for equipment_data in equipment_data:
                CarListingEquipment.objects.create(car_listing=instance, **equipment_data)

        if modifications_data is not None:
            instance.modifications.all().delete()
            for modification_data in modifications_data:
                CarListingModification.objects.create(car_listing=instance, **modification_data)

        if known_flaws_data is not None:
            instance.known_flaws.all().delete()
            for known_flaw_data in known_flaws_data:
                CarListingKnownFlaw.objects.create(car_listing=instance, **known_flaw_data)

        if videos_data is not None:
            instance.videos.all().delete()
            for video_data in videos_data:
                CarListingVideoWalkaround.objects.create(car_listing=instance, **video_data)

        return instance

class CarListingSuggestionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    manufacturer_name = serializers.CharField(source='manufacturer.name', read_only=True)

    class Meta:
        model = CarListing
        fields = ['id', 'make', 'model', 'manufacturer_name', 'image']

    def get_image(self, obj):
        primary_image = obj.images.first()
        if primary_image and primary_image.image:
            return self.context['request'].build_absolute_uri(primary_image.image.url)
        return None
        if modifications_data is not None:
            instance.modifications.all().delete()
            for modification_data in modifications_data:
                CarListingModification.objects.create(car_listing=instance, **modification_data)

        if known_flaws_data is not None:
            instance.known_flaws.all().delete()
            for known_flaw_data in known_flaws_data:
                CarListingKnownFlaw.objects.create(car_listing=instance, **known_flaw_data)

        if videos_data is not None:
            instance.videos.all().delete()
            for video_data in videos_data:
                CarListingVideoWalkaround.objects.create(car_listing=instance, **video_data)

        return instance


class CarListingSuggestionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    manufacturer_name = serializers.CharField(source='manufacturer.name', read_only=True)

    class Meta:
        model = CarListing
        fields = ['id', 'make', 'model', 'manufacturer_name', 'image']

    def get_image(self, obj):
        primary_image = obj.images.first()
        if primary_image and primary_image.image:
            return self.context['request'].build_absolute_uri(primary_image.image.url)
        return None