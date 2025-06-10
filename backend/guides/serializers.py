from rest_framework import serializers
from .models import Guide, GuideCategory, Hashtag


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ['id', 'name', 'slug']


class GuideCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideCategory
        fields = ['id', 'name', 'slug']


class GuideSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # you can switch to `UserSerializer` if needed
    hashtags = HashtagSerializer(many=True, read_only=True)
    category = GuideCategorySerializer(read_only=True)
    related_brands = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        read_only=True
    )

    class Meta:
        model = Guide
        fields = [
            'id', 'title', 'slug', 'cover_image', 'author',
            'content', 'excerpt', 'guide_type', 'category',
            'hashtags', 'estimated_read_time', 'views', 'likes',
            'shares', 'created_at', 'updated_at', 'published',
            'publish_date', 'difficulty_level', 'related_brands',
            'call_to_action_text', 'call_to_action_url',
            'seo_title', 'seo_description', 'thumbnail_alt_text',
        ]
