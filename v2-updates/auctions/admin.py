from unfold.admin import ModelAdmin as UnfoldAdmin
from unfold.decorators import action
from django.contrib import admin
from .models import (
    CarAuction, AuctionImage, Review, Equipment, Modification, KnownFlaw, VideoWalkaround
)

class AuctionImageInline(admin.TabularInline):
    model = AuctionImage
    extra = 1  # Number of empty forms to display

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

class EquipmentInline(admin.TabularInline):
    model = Equipment
    extra = 1

class ModificationInline(admin.TabularInline):
    model = Modification
    extra = 1

class KnownFlawInline(admin.TabularInline):
    model = KnownFlaw
    extra = 1

class VideoWalkaroundInline(admin.TabularInline):
    model = VideoWalkaround
    extra = 1

@admin.register(CarAuction)
class CarAuctionAdmin(UnfoldAdmin):
    list_display = ("title", "make", "model", "year", "price", "seller", "auction_deadline", "featured", "num_bids")
    list_filter = ("featured", "seller_type", "transmission", "fuel_type", "drivetrain", "body_style", "year")
    search_fields = ("title", "make", "model", "description", "location")
    ordering = ("-created_at",)
    inlines = [
        AuctionImageInline,
        ReviewInline,
        EquipmentInline,
        ModificationInline,
        KnownFlawInline,
        VideoWalkaroundInline,
    ]
    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "description", "location", "featured", "seller", "seller_type")
        }),
        ("Car Details", {
            "fields": ("make", "model", "year", "mileage", "price")
        }),
        ("Specs", {
            "fields": ("transmission", "drivetrain", "fuel_type", "body_style", "title_status")
        }),
        ("Auction", {
            "fields": ("auction_deadline",)
        }),
    )

    class Media:
        css = {
            'all': ('auctions/unfold_custom.css',)
        }

@admin.register(AuctionImage)
class AuctionImageAdmin(UnfoldAdmin):
    list_display = ("auction", "image")

@admin.register(Review)
class ReviewAdmin(UnfoldAdmin):
    list_display = ("auction", "user", "rating", "comment", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("user__username", "comment")

@admin.register(Equipment)
class EquipmentAdmin(UnfoldAdmin):
    list_display = ("auction", "name")

@admin.register(Modification)
class ModificationAdmin(UnfoldAdmin):
    list_display = ("auction", "name")

@admin.register(KnownFlaw)
class KnownFlawAdmin(UnfoldAdmin):
    list_display = ("auction", "description")

@admin.register(VideoWalkaround)
class VideoWalkaroundAdmin(UnfoldAdmin):
    list_display = ("auction", "video_url")