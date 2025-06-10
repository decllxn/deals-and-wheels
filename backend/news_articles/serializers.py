from rest_framework import serializers
from django.utils.timesince import timesince
from django.contrib.auth import get_user_model
from manufacturers.models import Manufacturer
from manufacturers.serializers import ManufacturerSerializer
from .models import (
    NewsItem, NewsCategory, Hashtag, NewsComment, CommentEmojiReaction
)

User = get_user_model()


# Utility Serializer for Author
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name"]


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ["id", "name", "slug"]


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ["id", "name", "slug"]


class ManufacturerMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ["id", "name", "slug", "logo"]


# Emoji Reaction Serializer
class CommentEmojiReactionSerializer(serializers.ModelSerializer):
    user = AuthorSerializer(read_only=True)

    class Meta:
        model = CommentEmojiReaction
        fields = ["id", "emoji", "user"]


# Recursive Comment Serializer for replies
class RecursiveCommentSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = NewsCommentSerializer(value, context=self.context)
        return serializer.data


# News Comment Serializer
class NewsCommentSerializer(serializers.ModelSerializer):
    user = AuthorSerializer(read_only=True)
    replies = RecursiveCommentSerializer(many=True, read_only=True)
    emoji_reactions = CommentEmojiReactionSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    time_since_posted = serializers.SerializerMethodField()

    class Meta:
        model = NewsComment
        fields = [
            "id",
            "news_item",
            "user",
            "parent",
            "content",
            "created_at",
            "time_since_posted",
            "likes_count",
            "emoji_reactions",
            "replies",
        ]

    def get_likes_count(self, obj):
        return obj.liked_by.count()

    def get_time_since_posted(self, obj):
        return timesince(obj.created_at)


# News Item Serializer
class NewsItemSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = NewsCategorySerializer(read_only=True)
    manufacturer = ManufacturerMiniSerializer(read_only=True)
    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True
    )
    hashtags = HashtagSerializer(many=True, read_only=True)
    liked_by = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    shared_by = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = NewsCommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    shares_count = serializers.SerializerMethodField()

    class Meta:
        model = NewsItem
        fields = [
            "id",
            "title",
            "slug",
            "image",
            "author",
            "content",
            "created_at",
            "published_at",
            "views",
            "estimated_read_time",
            "category",
            "manufacturer",
            "manufacturer_id",
            "hashtags",
            "liked_by",
            "shared_by",
            "likes_count",
            "shares_count",
            "comments",
        ]
        read_only_fields = ["slug", "estimated_read_time"]

    def get_likes_count(self, obj):
        return obj.liked_by.count()

    def get_shares_count(self, obj):
        return obj.shared_by.count()