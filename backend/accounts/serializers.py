from rest_framework import serializers
from .models import User
from dealers.serializers import DealerSerializer  # import DealerSerializer from dealer app


class UserSerializer(serializers.ModelSerializer):
    dealer_profile = DealerSerializer(read_only=True)  # include related dealer info

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "is_active",
            "is_dealer",
            "dealer_profile",  # nested dealer profile
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user