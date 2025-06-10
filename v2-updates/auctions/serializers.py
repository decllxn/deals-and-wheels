from rest_framework import serializers
from .models import (
    CarAuction, AuctionImage, Review, Equipment, Modification, KnownFlaw, VideoWalkaround
)


class AuctionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionImage
        fields = ["id", "image"]


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Make user read-only

    class Meta:
        model = Review
        fields = ["id", "user", "rating", "comment", "created_at"]
        read_only_fields = ["created_at"]  # Ensure created_at is read-only


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["id", "name"]


class ModificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modification
        fields = ["id", "name"]


class KnownFlawSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnownFlaw
        fields = ["id", "description"]


class VideoWalkaroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoWalkaround
        fields = ["id", "video_url"]


class CarAuctionSerializer(serializers.ModelSerializer):
    images = AuctionImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    equipment = EquipmentSerializer(many=True)  # Allow adding/removing existing equipment
    modifications = ModificationSerializer(many=True)  # Allow adding/removing existing modifications
    known_flaws = KnownFlawSerializer(many=True)  # Allow adding/removing existing known flaws
    videos = VideoWalkaroundSerializer(many=True)  # Allow adding/removing existing videos
    seller = serializers.StringRelatedField(read_only=True) # Make seller read-only

    class Meta:
        model = CarAuction
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "num_bids", "current_bid"]

    def get_rating(self, obj):
        return obj.reviews.aggregate(Avg('rating'))['rating__avg']

    def get_num_reviews(self, obj):
        return obj.reviews.aggregate(Count('id'))['id__count']

class CarAuctionSuggestionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarAuction
        fields = ['id', 'make', 'model', 'image']

    def get_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image and primary_image.image:
            return self.context['request'].build_absolute_uri(primary_image.image.url)
        else:
            first_image = obj.images.first()
            if first_image and first_image.image:
                return self.context['request'].build_absolute_uri(first_image.image.url)
        return None