from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import GuideCategory, Hashtag, Guide

@admin.register(GuideCategory)
class GuideCategoryAdmin(ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    icon = "folder"

@admin.register(Hashtag)
class HashtagAdmin(ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    icon = "hash"

@admin.register(Guide)
class GuideAdmin(ModelAdmin):
    list_display = ('title', 'author', 'category', 'guide_type', 'difficulty_level', 'published', 'publish_date', 'views', 'likes')
    list_filter = ('guide_type', 'category', 'created_at', 'published', 'difficulty_level')
    search_fields = ('title', 'content', 'seo_title', 'seo_description')
    autocomplete_fields = ('author', 'category', 'hashtags')
    readonly_fields = ('slug', 'estimated_read_time', 'views')
    icon = "book"

    # Optionally, to calculate read time automatically when the model is saved, you can make sure the field 'estimated_read_time' is calculated before saving.
    def save_model(self, request, obj, form, change):
        obj.estimated_read_time = obj.calculate_read_time()
        super().save_model(request, obj, form, change)