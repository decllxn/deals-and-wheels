from rest_framework import serializers
from .models import Dealer, DealerRating

class DealerSerializer(serializers.ModelSerializer):
    car_count = serializers.ReadOnlyField() # Add the car_count property
    class Meta:
        model = Dealer
        fields = '__all__'
        # Or explicitly list fields including 'car_count':
        # fields = ['id', 'name', 'address', ..., 'car_count']

class DealerRatingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = DealerRating
        fields = ['id', 'dealer', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']