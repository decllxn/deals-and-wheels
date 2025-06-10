from unfold.admin import ModelAdmin as UnfoldAdmin
from django.contrib import admin
from .models import Dealer, DealerRating

@admin.register(Dealer)
class DealerAdmin(UnfoldAdmin):  # Inherit from UnfoldAdmin
    list_display = ('name', 'user_email', 'is_verified', 'average_rating', 'rating_count', 'car_count')
    search_fields = ('name', 'address', 'user__email', 'user__first_name', 'user__last_name')
    list_filter = ('is_verified',)
    readonly_fields = ('average_rating', 'rating_count', 'created_at', 'updated_at', 'car_count')
    fieldsets = (
        (None, {'fields': ('user', 'name', 'logo', 'description')}),
        ('Contact Information', {'fields': ('address', 'website')}),
        ('Verification and Business Details', {'fields': ('is_verified', 'verification_date')}),
        ('Ratings and Counts', {'fields': ('average_rating', 'rating_count', 'cars_sold_count', 'car_count')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    raw_id_fields = ('user',) # Use raw ID field for ForeignKey

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

@admin.register(DealerRating)
class DealerRatingAdmin(UnfoldAdmin):  # Inherit from UnfoldAdmin
    list_display = ('dealer', 'user_email', 'rating', 'created_at')
    search_fields = ('dealer__name', 'user__email', 'comment')
    list_filter = ('dealer', 'rating')
    readonly_fields = ('created_at',)

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'