from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Manufacturer


@admin.register(Manufacturer)
class ManufacturerAdmin(ModelAdmin):
    list_display = ('name', 'country', 'founded_year', 'website')
    search_fields = ('name', 'country')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    icon = "factory"  # Pick any Unfold icon you like