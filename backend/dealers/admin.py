# backend/dealers/admin.py
from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldAdmin
from .models import Dealer, DealerRating


@admin.register(Dealer)
class DealerAdmin(UnfoldAdmin):
    list_display = (
        'name', 'user_email', 'is_verified', 'average_rating',
        'rating_count', 'cars_listed_count', 'cars_sold_count', 'total_cars'
    )
    search_fields = ('name', 'address', 'user__email', 'company_name')
    list_filter = ('is_verified', 'business_type')
    readonly_fields = (
        'average_rating', 'rating_count',
        'cars_listed_count', 'cars_sold_count',
        'created_at', 'updated_at'
    )
    fieldsets = (
        (None, {
            'fields': ('user', 'name', 'logo', 'description')
        }),
        ('Contact Info', {
            'fields': ('address', 'website', 'contact_number', 'business_type')
        }),
        ('Verification', {
            'fields': ('is_verified', 'verification_date')
        }),
        ('Performance', {
            'fields': (
                'average_rating', 'rating_count',
                'cars_listed_count', 'cars_sold_count'
            )
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    raw_id_fields = ('user',)

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Dealer Email'


@admin.register(DealerRating)
class DealerRatingAdmin(UnfoldAdmin):
    list_display = ('dealer', 'user_email', 'rating', 'created_at')
    search_fields = ('dealer__name', 'user__email', 'comment')
    list_filter = ('rating',)
    readonly_fields = ('created_at',)

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'