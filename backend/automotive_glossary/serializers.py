from rest_framework import serializers
from .models import GlossaryCategory, GlossaryTerm, Tag, GlossaryTermRelatedLink, Comment, Rating
from django.contrib.auth import get_user_model

User = get_user_model()

class GlossaryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryCategory
        fields = ['id', 'name', 'slug', 'description']


class GlossaryTermSerializer(serializers.ModelSerializer):
    category = GlossaryCategorySerializer(read_only=True)
    related_terms = serializers.SlugRelatedField(slug_field='slug', queryset=GlossaryTerm.objects.all(), many=True)
    author = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    tags = serializers.StringRelatedField(many=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    views_count = serializers.IntegerField(source='views', read_only=True)

    class Meta:
        model = GlossaryTerm
        fields = ['id', 'title', 'slug', 'definition', 'category', 'related_terms', 'author', 'created_at', 'updated_at', 'published', 'seo_title', 'seo_description', 'thumbnail_image', 'likes_count', 'views_count', 'estimated_read_time']


class TagSerializer(serializers.ModelSerializer):
    glossary_terms = serializers.StringRelatedField(many=True)

    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'glossary_terms']


class GlossaryTermRelatedLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryTermRelatedLink
        fields = ['id', 'url', 'title', 'glossary_term', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    glossary_term = serializers.StringRelatedField()
    replies = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'glossary_term', 'content', 'created_at', 'parent_comment', 'replies', 'likes_count']

    def get_replies(self, obj):
        # Return the replies for a parent comment
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True).data


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    glossary_term = serializers.StringRelatedField()

    class Meta:
        model = Rating
        fields = ['id', 'user', 'glossary_term', 'rating', 'created_at']