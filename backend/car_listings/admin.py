from unfold.admin import ModelAdmin as UnfoldAdmin
from django.contrib import admin
from .models import CarListing, CarListingImage

class CarListingImageInline(admin.TabularInline):
    model = CarListingImage
    extra = 1

@admin.register(CarListing)
class CarListingAdmin(UnfoldAdmin):  # Inherit from UnfoldAdmin
    list_display = ('year', 'make', 'model', 'price', 'is_sold', 'created_at', 'dealer_name')
    search_fields = ('make', 'model', 'vin', 'description', 'dealer__name')
    list_filter = ('is_featured', 'is_sold', 'fuel_type', 'body_style', 'year', 'transmission', 'drivetrain', 'dealer', 'has_warranty', 'seller_type')
    inlines = [CarListingImageInline]
    fieldsets = (
        (None, {'fields': ('dealer', 'seller', 'seller_type', 'make', 'model', 'year', 'vin', 'title')}),
        ('Specifications', {'classes': ('collapse',), 'fields': ('mileage', 'engine', 'fuel_type', 'drivetrain', 'transmission', 'body_style', 'exterior_color', 'interior_color', 'title_status', 'description')}),
        ('Pricing & Status', {'fields': ('price', 'is_featured', 'is_sold', 'has_warranty')}),
        ('Location', {'fields': ('location',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse', 'wide')}),
    )
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('dealer', 'seller') # Use raw ID field for ForeignKeys

    def dealer_name(self, obj):
        return obj.dealer.name if obj.dealer else "Private Seller"
    dealer_name.short_description = 'Dealer'
    dealer_name.admin_order_field = 'dealer__name'

@admin.register(CarListingImage)
class CarListingImageAdmin(UnfoldAdmin):  # Inherit from UnfoldAdmin
    list_display = ('car_listing_make_model', 'image_preview')
    list_filter = ('car_listing',)
    readonly_fields = ('image_preview',)
    raw_id_fields = ('car_listing',) # Use raw ID field for ForeignKey

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px; max-width: 150px;" />'
        return '(No image)'
    image_preview.short_description = 'Image Preview'
    image_preview.allow_tags = True

    def car_listing_make_model(self, obj):
        return f"{obj.car_listing.make} {obj.car_listing.model}"
    car_listing_make_model.short_description = 'Car Listing'