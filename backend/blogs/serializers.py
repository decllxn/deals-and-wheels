from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Category, Hashtag, Blog, BlogLike, BlogShare,
    Comment, CommentLike
)
from manufacturers.models import Manufacturer

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'slug', 'logo']
        read_only_fields = ['slug']


class BlogLikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = BlogLike
        fields = ['id', 'user', 'created_at']


class BlogShareSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = BlogShare
        fields = ['id', 'user', 'platform', 'shared_at']


class CommentLikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = CommentLike
        fields = ['id', 'user', 'liked_at']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    replies = serializers.SerializerMethodField()
    likes = CommentLikeSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id', 'blog', 'author', 'content', 'parent',
            'created_at', 'replies', 'likes'
        ]

    def get_replies(self, obj):
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True, context=self.context).data


class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    category = CategorySerializer(read_only=True)
    manufacturer = ManufacturerSerializer(read_only=True)
    hashtags = HashtagSerializer(many=True, read_only=True)
    likes = BlogLikeSerializer(many=True, read_only=True)
    shares = BlogShareSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    num_likes = serializers.IntegerField(read_only=True)
    num_comments = serializers.IntegerField(read_only=True)

    # ✅ Fields for write operations (only ID input)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    manufacturer_id = serializers.PrimaryKeyRelatedField(
        queryset=Manufacturer.objects.all(),
        source='manufacturer',
        write_only=True
    )
    hashtag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Hashtag.objects.all(),
        source='hashtags',
        many=True,
        write_only=True
    )

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'image', 'author', 'content',
            'created_at', 'published_at', 'is_published', 'views', 'read_time',
            'category', 'category_id',
            'manufacturer', 'manufacturer_id',
            'hashtags', 'hashtag_ids',
            'likes', 'shares', 'comments',
            'num_likes', 'num_comments'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'read_time', 'views']