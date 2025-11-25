from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Dealer, DealerRating
from car_listings.models import CarListing, CarListingImage, CarListingFeature, CarListingEquipment, CarListingModification, CarListingKnownFlaw, CarListingVideoWalkaround
from dealer_dashboard.models import DealerDailyMetrics  # safe import

User = get_user_model()


# -----------------------------
# Car Listing Serializers
# -----------------------------
class CarListingImageSerializer(serializers.ModelSerializer):
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


class CarListingVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarListingVideoWalkaround
        fields = ["id", "video_url"]


class CarListingSerializer(serializers.ModelSerializer):
    images = CarListingImageSerializer(many=True, read_only=True)
    features = CarListingFeatureSerializer(many=True, read_only=True)
    equipment = CarListingEquipmentSerializer(many=True, read_only=True)
    modifications = CarListingModificationSerializer(many=True, read_only=True)
    known_flaws = CarListingKnownFlawSerializer(many=True, read_only=True)
    videos = CarListingVideoSerializer(many=True, read_only=True)

    class Meta:
        model = CarListing
        fields = [
            "id",
            "slug",
            "title",
            "manufacturer",
            "make",
            "model",
            "year",
            "price",
            "mileage",
            "transmission",
            "drivetrain",
            "fuel_type",
            "body_style",
            "exterior_color",
            "interior_color",
            "vin",
            "engine",
            "title_status",
            "seller_type",
            "condition",
            "location",
            "description",
            "is_featured",
            "is_sold",
            "has_warranty",
            "images",
            "features",
            "equipment",
            "modifications",
            "known_flaws",
            "videos",
            "created_at",
            "updated_at",
        ]


# -----------------------------
# Dealer Serializer (Updated)
# -----------------------------
class DealerSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")
    full_name = serializers.SerializerMethodField()
    cars_listed_count = serializers.SerializerMethodField()
    cars_sold_count = serializers.SerializerMethodField()
    total_cars = serializers.SerializerMethodField()
    dashboard = serializers.SerializerMethodField()
    
    # <-- Add actual car listings
    car_listings = CarListingSerializer(many=True, read_only=True)

    class Meta:
        model = Dealer
        fields = [
            "id",
            "slug",
            "name",
            "full_name",
            "user_email",
            "company_name",
            "business_type",
            "contact_number",
            "address",
            "website",
            "description",
            "logo",
            "is_verified",
            "verification_date",
            "average_rating",
            "rating_count",
            "cars_listed_count",
            "cars_sold_count",
            "total_cars",
            "dashboard",
            "car_listings",  # added
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields

    # -----------------------------
    # Computed fields
    # -----------------------------
    def get_full_name(self, obj):
        user = getattr(obj, "user", None)
        if not user:
            return ""
        return " ".join(filter(None, [user.first_name, user.last_name])).strip()

    def get_cars_listed_count(self, obj):
        return obj.car_listings.count() if hasattr(obj, "car_listings") else 0

    def get_cars_sold_count(self, obj):
        return obj.car_listings.filter(is_sold=True).count() if hasattr(obj, "car_listings") else 0

    def get_total_cars(self, obj):
        return self.get_cars_listed_count(obj)

    def get_dashboard(self, obj):
        try:
            from dealer_dashboard.serializers import DealerDashboardSerializer
            return DealerDashboardSerializer(obj).data
        except Exception:
            return {
                "overview": {},
                "metrics_trend": {},
                "summary_cards": {},
            }


# -----------------------------
# Dealer Signup Serializer
# -----------------------------
class DealerSignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=6, style={"input_type": "password"})
    confirm_password = serializers.CharField(write_only=True, min_length=6, style={"input_type": "password"})

    class Meta:
        model = Dealer
        fields = [
            "email",
            "password",
            "confirm_password",
            "name",
            "company_name",
            "business_type",
            "contact_number",
            "website",
            "address",
            "description",
            "logo",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        if User.objects.filter(email=attrs.get("email")).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        return attrs

    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        validated_data.pop("confirm_password", None)
        user = User.objects.create_user(email=email, password=password, is_dealer=True)
        dealer = Dealer.objects.create(user=user, **validated_data)
        return dealer

    def to_representation(self, instance):
        return {
            "message": "Dealer account created successfully.",
            "dealer": DealerSerializer(instance, context=self.context).data,
        }


# -----------------------------
# Dealer Rating Serializer
# -----------------------------
class DealerRatingSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")
    dealer_name = serializers.ReadOnlyField(source="dealer.name")
    dealer_slug = serializers.ReadOnlyField(source="dealer.slug")

    class Meta:
        model = DealerRating
        fields = [
            "id",
            "dealer",
            "dealer_name",
            "dealer_slug",
            "user_email",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ["user_email", "dealer_name", "dealer_slug", "created_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            validated_data["user"] = request.user
        return super().create(validated_data)