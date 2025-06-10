from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import GlossaryCategory, GlossaryTerm, Tag, GlossaryTermRelatedLink, Comment, Rating

@admin.register(GlossaryCategory)
class GlossaryCategoryAdmin(ModelAdmin):
    list_display = ('name', 'slug', 'description')
    search_fields = ('name',)
    icon = "tag"

@admin.register(GlossaryTerm)
class GlossaryTermAdmin(ModelAdmin):
    list_display = ('title', 'category', 'author', 'published', 'created_at', 'updated_at', 'views', 'estimated_read_time')
    list_filter = ('published', 'category', 'created_at', 'author')
    search_fields = ('title', 'definition', 'seo_title', 'seo_description')
    autocomplete_fields = ('category', 'author', 'related_terms', 'tags')
    readonly_fields = ('slug', 'views', 'estimated_read_time')
    icon = "article"

@admin.register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    icon = "hash"

@admin.register(GlossaryTermRelatedLink)
class GlossaryTermRelatedLinkAdmin(ModelAdmin):
    list_display = ('title', 'glossary_term', 'url', 'created_at')
    list_filter = ('created_at',)
    icon = "link"

@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    list_display = ('glossary_term', 'user', 'created_at', 'parent_comment')
    list_filter = ('created_at', 'glossary_term')
    search_fields = ('content',)
    icon = "message"

@admin.register(Rating)
class RatingAdmin(ModelAdmin):
    list_display = ('user', 'glossary_term', 'rating', 'created_at')
    list_filter = ('created_at', 'rating')
    icon = "star"