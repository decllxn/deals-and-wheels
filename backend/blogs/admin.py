from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import (
    Category,
    Hashtag,
    Blog,
    BlogLike,
    BlogShare,
    Comment,
    CommentLike,
)

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    icon = "tag"


@admin.register(Hashtag)
class HashtagAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    icon = "hash"


@admin.register(Blog)
class BlogAdmin(ModelAdmin):
    list_display = ('title', 'author', 'manufacturer', 'category', 'is_published', 'published_at', 'views', 'read_time')
    list_filter = ('is_published', 'category', 'manufacturer', 'created_at')
    search_fields = ('title', 'content')
    autocomplete_fields = ('author', 'category', 'hashtags', 'manufacturer')
    readonly_fields = ('read_time', 'views', 'slug')
    icon = "article"


@admin.register(BlogLike)
class BlogLikeAdmin(ModelAdmin):
    list_display = ('user', 'blog', 'created_at')
    list_filter = ('created_at',)
    autocomplete_fields = ('user', 'blog')
    icon = "thumb-up"


@admin.register(BlogShare)
class BlogShareAdmin(ModelAdmin):
    list_display = ('user', 'blog', 'platform', 'shared_at')
    list_filter = ('platform', 'shared_at')
    autocomplete_fields = ('user', 'blog')
    icon = "share"


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    list_display = ('blog', 'author', 'created_at', 'parent')
    list_filter = ('created_at',)
    search_fields = ('content',)
    autocomplete_fields = ('blog', 'author', 'parent')
    icon = "message"


@admin.register(CommentLike)
class CommentLikeAdmin(ModelAdmin):
    list_display = ('user', 'comment', 'liked_at')
    autocomplete_fields = ('user', 'comment')
    icon = "heart"