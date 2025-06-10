from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import (
    NewsCategory,
    Hashtag,
    NewsItem,
    NewsComment,
    CommentEmojiReaction
)

# Register NewsCategory
@admin.register(NewsCategory)
class NewsCategoryAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    icon = "tag"


# Register Hashtag
@admin.register(Hashtag)
class HashtagAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    icon = "hash"


# Register NewsItem
@admin.register(NewsItem)
class NewsItemAdmin(ModelAdmin):
    list_display = ('title', 'author', 'manufacturer', 'category', 'published_at', 'views', 'estimated_read_time')
    list_filter = ('category', 'manufacturer', 'published_at')
    search_fields = ('title', 'content')
    autocomplete_fields = ('author', 'category', 'hashtags', 'manufacturer')
    readonly_fields = ('estimated_read_time', 'views', 'slug')
    icon = "article"


# Register NewsComment
@admin.register(NewsComment)
class NewsCommentAdmin(ModelAdmin):
    list_display = ('news_item', 'user', 'created_at', 'parent')
    list_filter = ('created_at',)
    search_fields = ('content',)
    autocomplete_fields = ('news_item', 'user', 'parent')
    icon = "message"


# Register CommentEmojiReaction
@admin.register(CommentEmojiReaction)
class CommentEmojiReactionAdmin(ModelAdmin):
    list_display = ('comment', 'user', 'emoji')
    autocomplete_fields = ('comment', 'user')
    icon = "smile"