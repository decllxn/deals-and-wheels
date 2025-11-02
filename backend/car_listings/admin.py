from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldAdmin
from .models import (
    CarListing,
    CarListingImage,
    CarListingFeature,
    CarListingEquipment,
    CarListingModification,
    CarListingKnownFlaw,
    CarListingVideoWalkaround,
)


# ---------------------------
# Inline Configurations
# ---------------------------
class CarListingImageInline(admin.TabularInline):
    model = CarListingImage
    extra = 1
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px; max-width: 150px;" />'
        return "(No image)"
    image_preview.short_description = "Preview"
    image_preview.allow_tags = True


class CarListingFeatureInline(admin.TabularInline):
    model = CarListingFeature
    extra = 1


class CarListingEquipmentInline(admin.TabularInline):
    model = CarListingEquipment
    extra = 1


class CarListingModificationInline(admin.TabularInline):
    model = CarListingModification
    extra = 1


class CarListingKnownFlawInline(admin.TabularInline):
    model = CarListingKnownFlaw
    extra = 1


class CarListingVideoInline(admin.TabularInline):
    model = CarListingVideoWalkaround
    extra = 1


# ---------------------------
# Main Car Listing Admin
# ---------------------------
@admin.register(CarListing)
class CarListingAdmin(UnfoldAdmin):
    list_display = (
        "title",
        "year",
        "make",
        "model",
        "price",
        "fuel_type",
        "transmission",
        "condition",
        "seller_type",
        "dealer_name",
        "is_sold",
        "is_featured",
        "created_at",
    )
    search_fields = (
        "title",
        "make",
        "model",
        "vin",
        "location",
        "dealer__name",
        "seller__username",
    )
    list_filter = (
        "is_featured",
        "is_sold",
        "fuel_type",
        "body_style",
        "year",
        "transmission",
        "drivetrain",
        "dealer",
        "has_warranty",
        "seller_type",
        "condition",
    )
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    inlines = [
        CarListingImageInline,
        CarListingFeatureInline,
        CarListingEquipmentInline,
        CarListingModificationInline,
        CarListingKnownFlawInline,
        CarListingVideoInline,
    ]

    readonly_fields = ("slug", "created_at", "updated_at")

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "manufacturer",
                    "make",
                    "model",
                    "year",
                    "slug",
                    "vin",
                    "condition",
                    "seller_type",
                    "dealer",
                    "seller",
                )
            },
        ),
        (
            "Specifications",
            {
                "classes": ("collapse",),
                "fields": (
                    "engine",
                    "mileage",
                    "fuel_type",
                    "transmission",
                    "drivetrain",
                    "body_style",
                    "exterior_color",
                    "interior_color",
                    "title_status",
                ),
            },
        ),
        (
            "Pricing & Status",
            {
                "fields": (
                    "price",
                    "is_featured",
                    "is_sold",
                    "has_warranty",
                )
            },
        ),
        (
            "Description & Location",
            {
                "fields": (
                    "description",
                    "location",
                )
            },
        ),
        (
            "Timestamps",
            {
                "classes": ("collapse",),
                "fields": (
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    raw_id_fields = ("dealer", "seller", "manufacturer")

    def dealer_name(self, obj):
        return obj.dealer.name if obj.dealer else "Private Seller"
    dealer_name.short_description = "Dealer"
    dealer_name.admin_order_field = "dealer__name"


# ---------------------------
# Related Models Admin
# ---------------------------
@admin.register(CarListingImage)
class CarListingImageAdmin(UnfoldAdmin):
    list_display = ("car_listing", "image_preview")
    search_fields = ("car_listing__make", "car_listing__model")
    readonly_fields = ("image_preview",)
    raw_id_fields = ("car_listing",)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px; max-width: 150px;" />'
        return "(No image)"
    image_preview.short_description = "Image Preview"
    image_preview.allow_tags = True


@admin.register(CarListingFeature)
class CarListingFeatureAdmin(UnfoldAdmin):
    list_display = ("name", "car_listing")
    search_fields = ("name", "car_listing__make", "car_listing__model")
    raw_id_fields = ("car_listing",)


@admin.register(CarListingEquipment)
class CarListingEquipmentAdmin(UnfoldAdmin):
    list_display = ("name", "car_listing")
    search_fields = ("name", "car_listing__make", "car_listing__model")
    raw_id_fields = ("car_listing",)


@admin.register(CarListingModification)
class CarListingModificationAdmin(UnfoldAdmin):
    list_display = ("name", "car_listing")
    search_fields = ("name", "car_listing__make", "car_listing__model")
    raw_id_fields = ("car_listing",)


@admin.register(CarListingKnownFlaw)
class CarListingKnownFlawAdmin(UnfoldAdmin):
    list_display = ("car_listing", "short_description")
    search_fields = ("car_listing__make", "car_listing__model", "description")
    raw_id_fields = ("car_listing",)

    def short_description(self, obj):
        return (obj.description[:75] + "...") if len(obj.description) > 75 else obj.description
    short_description.short_description = "Description"


@admin.register(CarListingVideoWalkaround)
class CarListingVideoAdmin(UnfoldAdmin):
    list_display = ("car_listing", "video_url")
    search_fields = ("car_listing__make", "car_listing__model", "video_url")
    raw_id_fields = ("car_listing",)