from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils import timezone

# Lazy import hints (avoids circular dependencies)
# Dealer is imported inside save() to prevent circular import issues
from manufacturers.models import Manufacturer


User = settings.AUTH_USER_MODEL


# -------------------------------------------------------------------
# Main Car Listing Model
# -------------------------------------------------------------------
class CarListing(models.Model):
    """
    Represents a vehicle listed for sale by a dealer or private seller.
    """

    # -----------------------------
    # Choice Constants
    # -----------------------------
    TRANSMISSION_CHOICES = [
        ("Automatic", "Automatic"),
        ("Manual", "Manual"),
        ("CVT", "CVT"),
        ("Dual-Clutch", "Dual-Clutch"),
        ("Semi-Automatic", "Semi-Automatic"),
        ("Other", "Other"),
    ]

    DRIVETRAIN_CHOICES = [
        ("FWD", "Front-Wheel Drive"),
        ("RWD", "Rear-Wheel Drive"),
        ("AWD", "All-Wheel Drive"),
        ("4WD", "Four-Wheel Drive"),
    ]

    FUEL_TYPE_CHOICES = [
        ("Petrol", "Petrol"),
        ("Diesel", "Diesel"),
        ("Hybrid", "Hybrid"),
        ("Electric", "Electric"),
    ]

    BODY_STYLE_CHOICES = [
        ("Sedan", "Sedan"),
        ("SUV", "SUV"),
        ("Hatchback", "Hatchback"),
        ("Truck", "Truck"),
        ("Coupe", "Coupe"),
        ("Convertible", "Convertible"),
        ("Wagon", "Wagon"),
        ("Other", "Other"),
    ]

    TITLE_STATUS_CHOICES = [
        ("Clean", "Clean"),
        ("Salvage", "Salvage"),
        ("Rebuilt", "Rebuilt"),
        ("Parts Only", "Parts Only"),
    ]

    SELLER_TYPE_CHOICES = [
        ("Dealer", "Dealer"),
        ("Private Seller", "Private Seller"),
    ]

    CONDITION_CHOICES = [
        ("New", "New"),
        ("Used", "Used"),
    ]

    # -----------------------------
    # Core Fields
    # -----------------------------
    title = models.CharField(max_length=255)
    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        related_name="car_listings",
        null=True,
        blank=True,
    )
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    slug = models.SlugField(max_length=300, unique=True, blank=True, null=True)

    price = models.DecimalField(max_digits=12, decimal_places=2)
    mileage = models.PositiveIntegerField(help_text="Mileage in kilometers")

    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES)
    drivetrain = models.CharField(max_length=20, choices=DRIVETRAIN_CHOICES)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPE_CHOICES)
    body_style = models.CharField(max_length=20, choices=BODY_STYLE_CHOICES)

    exterior_color = models.CharField(max_length=50, blank=True, null=True)
    interior_color = models.CharField(max_length=50, blank=True, null=True)
    vin = models.CharField(max_length=17, unique=True, blank=True, null=True)
    engine = models.CharField(max_length=100, blank=True, null=True)
    title_status = models.CharField(max_length=50, choices=TITLE_STATUS_CHOICES, blank=True, null=True)

    seller_type = models.CharField(max_length=20, choices=SELLER_TYPE_CHOICES)
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES, default="Used")
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    is_featured = models.BooleanField(default=False)
    is_sold = models.BooleanField(default=False)
    has_warranty = models.BooleanField(default=False)

    # -----------------------------
    # Relationships
    # -----------------------------
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="car_listings",
        help_text="User who created the car listing."
    )
    dealer = models.ForeignKey(
        "dealers.Dealer",
        on_delete=models.SET_NULL,
        related_name="car_listings",
        blank=True,
        null=True,
        help_text="Dealer associated with this listing (if seller is a dealer)."
    )

    # -----------------------------
    # Timestamps
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Save Logic
    # -----------------------------
    def save(self, *args, **kwargs):
        """Custom save logic to sync fields, slug, and dealer stats."""

        from dealers.models import Dealer  # ✅ safe import inside save
        from .models import CarListing  # safe reference for slug uniqueness check

        # ✅ Sync make name with manufacturer
        if self.manufacturer:
            self.make = self.manufacturer.name

        # ✅ Auto-link dealer if seller is a Dealer user
        if self.seller_type == "Dealer" and not self.dealer:
            try:
                self.dealer = Dealer.objects.get(user=self.seller)
            except Dealer.DoesNotExist:
                self.dealer = None

        # ✅ Remove dealer link if not a dealer seller
        if self.seller_type != "Dealer":
            self.dealer = None

        # ✅ Auto-generate unique slug
        if not self.slug:
            base_slug = slugify(f"{self.year}-{self.make}-{self.model}")
            slug = base_slug
            counter = 1
            while CarListing.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        super().save(*args, **kwargs)

        # ✅ Update dealer stats (listed/sold cars)
        if self.dealer:
            self.dealer.update_stats()

    def __str__(self):
        brand = self.manufacturer.name if self.manufacturer else self.make
        return f"{self.year} {brand} {self.model} - {self.title}"

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Car Listing"
        verbose_name_plural = "Car Listings"


# -------------------------------------------------------------------
# Related Models
# -------------------------------------------------------------------
class CarListingImage(models.Model):
    """Image gallery for each car listing."""
    car_listing = models.ForeignKey(
        CarListing, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="car_listing_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"Image for {self.car_listing}"


class CarListingFeature(models.Model):
    """Optional features of the car (e.g. Sunroof, Leather seats)."""
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="features")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingEquipment(models.Model):
    """Equipment or tech specs (e.g. Navigation System, Bluetooth)."""
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="equipment")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingModification(models.Model):
    """Aftermarket modifications made to the car."""
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="modifications")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingKnownFlaw(models.Model):
    """Known defects or issues reported for the car."""
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="known_flaws")
    description = models.TextField()

    def __str__(self):
        return f"Flaw for {self.car_listing}"


class CarListingVideoWalkaround(models.Model):
    """Video links for car walkarounds or demonstrations."""
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="videos")
    video_url = models.URLField()

    def __str__(self):
        return f"Video for {self.car_listing}"