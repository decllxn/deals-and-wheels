from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Dealer, DealerRating
from car_listings.models import CarListing  # ✅ Import to count listings

User = get_user_model()


# -------------------------------------------------------------------
# 🔹 Dealer Serializer
# -------------------------------------------------------------------
class DealerSerializer(serializers.ModelSerializer):
    """
    Serializer for viewing dealer profiles and car statistics.
    """

    user_email = serializers.ReadOnlyField(source="user.email")
    full_name = serializers.SerializerMethodField()
    cars_listed_count = serializers.SerializerMethodField()
    cars_sold_count = serializers.SerializerMethodField()
    total_cars = serializers.SerializerMethodField()

    class Meta:
        model = Dealer
        fields = [
            "id",
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
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "is_verified",
            "verification_date",
            "average_rating",
            "rating_count",
            "cars_listed_count",
            "cars_sold_count",
            "total_cars",
            "created_at",
            "updated_at",
        ]

    # -----------------------------
    # Computed fields
    # -----------------------------
    def get_full_name(self, obj):
        """Return the full name of the dealer's linked user."""
        user = getattr(obj, "user", None)
        if not user:
            return ""
        return " ".join(filter(None, [user.first_name, user.last_name])).strip()

    def get_cars_listed_count(self, obj):
        """Count all car listings under this dealer."""
        return CarListing.objects.filter(dealer=obj).count()

    def get_cars_sold_count(self, obj):
        """Count cars marked as sold."""
        return CarListing.objects.filter(dealer=obj, is_sold=True).count()

    def get_total_cars(self, obj):
        """Optionally sum listed and sold cars, or just total listings."""
        return CarListing.objects.filter(dealer=obj).count()


# -------------------------------------------------------------------
# 🔹 Dealer Signup Serializer
# -------------------------------------------------------------------
class DealerSignupSerializer(serializers.ModelSerializer):
    """
    Handles dealer registration, creating both User and Dealer records.
    """

    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(
        write_only=True, min_length=6, style={"input_type": "password"}
    )
    confirm_password = serializers.CharField(
        write_only=True, min_length=6, style={"input_type": "password"}
    )

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
        """Ensure passwords match and email is unique."""
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        if User.objects.filter(email=attrs.get("email")).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})

        return attrs

    def create(self, validated_data):
        """Create a user and linked dealer profile."""
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        validated_data.pop("confirm_password", None)

        user = User.objects.create_user(email=email, password=password, is_dealer=True)
        dealer = Dealer.objects.create(user=user, **validated_data)
        return dealer

    def to_representation(self, instance):
        """Custom signup response."""
        return {
            "message": "Dealer account created successfully.",
            "dealer": DealerSerializer(instance, context=self.context).data,
        }


# -------------------------------------------------------------------
# 🔹 Dealer Rating Serializer
# -------------------------------------------------------------------
class DealerRatingSerializer(serializers.ModelSerializer):
    """
    Serializer for dealer ratings and reviews.
    """

    user_email = serializers.ReadOnlyField(source="user.email")
    dealer_name = serializers.ReadOnlyField(source="dealer.name")

    class Meta:
        model = DealerRating
        fields = [
            "id",
            "dealer",
            "dealer_name",
            "user_email",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ["user_email", "dealer_name", "created_at"]

    def create(self, validated_data):
        """Automatically attach the logged-in user to the rating."""
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            validated_data["user"] = request.user
        return super().create(validated_data)