from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Car, Review


@admin.register(Car)
class CarAdmin(ModelAdmin):
    list_display = ('manufacturer', 'model_name', 'year', 'slug')
    search_fields = ('model_name', 'manufacturer__name')
    list_filter = ('manufacturer', 'year')
    autocomplete_fields = ['manufacturer']
    readonly_fields = ('slug',)


@admin.register(Review)
class ReviewAdmin(ModelAdmin):
    list_display = ('title', 'car', 'manufacturer', 'author', 'created_at', 'published_at', 'overall_rating')
    search_fields = ('title', 'car__model_name', 'manufacturer__name', 'author__username')
    list_filter = ('published_at', 'manufacturer', 'car')
    autocomplete_fields = ['car', 'manufacturer', 'author']
    readonly_fields = ('slug',)