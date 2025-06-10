from django.db import models
from django.conf import settings
from dealers.models import Dealer
from manufacturers.models import Manufacturer

User = settings.AUTH_USER_MODEL


class CarListing(models.Model):
    # Transmission Types
    TRANSMISSION_CHOICES = [
        ('Automatic', 'Automatic'),
        ('Manual', 'Manual'),
        ('CVT', 'CVT'),
        ('Dual-Clutch', 'Dual-Clutch'),
        ('Semi-Automatic', 'Semi-Automatic'),
        ('Other', 'Other'),
    ]

    # Drivetrain Types
    DRIVETRAIN_CHOICES = [
        ('FWD', 'Front-Wheel Drive'),
        ('RWD', 'Rear-Wheel Drive'),
        ('AWD', 'All-Wheel Drive'),
        ('4WD', 'Four-Wheel Drive'),
    ]

    # Fuel Types
    FUEL_TYPE_CHOICES = [
        ('Petrol', 'Petrol'),
        ('Diesel', 'Diesel'),
        ('Hybrid', 'Hybrid'),
        ('Electric', 'Electric'),
    ]

    # Body Styles
    BODY_STYLE_CHOICES = [
        ('Sedan', 'Sedan'),
        ('SUV', 'SUV'),
        ('Hatchback', 'Hatchback'),
        ('Truck', 'Truck'),
        ('Coupe', 'Coupe'),
        ('Convertible', 'Convertible'),
        ('Wagon', 'Wagon'),
        ('Other', 'Other'),
    ]

    # Title Status
    TITLE_STATUS_CHOICES = [
        ('Clean', 'Clean'),
        ('Salvage', 'Salvage'),
        ('Rebuilt', 'Rebuilt'),
        ('Parts Only', 'Parts Only'),
    ]

    # Seller Type
    SELLER_TYPE_CHOICES = [
        ('Dealer', 'Dealer'),
        ('Private Seller', 'Private Seller'),
    ]

    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Used', 'Used'),
    ]

    title = models.CharField(max_length=255)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, related_name="car_listings", null=True, blank=True)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mileage = models.PositiveIntegerField()  # in kilometers
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
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES, default='used')
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_sold = models.BooleanField(default=False)
    has_warranty = models.BooleanField(default=False)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="car_listings")
    dealer = models.ForeignKey(Dealer, on_delete=models.SET_NULL, blank=True, null=True, related_name="car_listings")  # Updated ForeignKey
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        brand = self.manufacturer.name if self.manufacturer else self.make
        seller_info = ""
        if self.seller_type == "Dealer" and self.dealer:
            seller_info = f" - Dealer: {self.dealer.name}"
        return f"{self.year} {brand} {self.model} - {self.title}{seller_info}"

    def save(self, *args, **kwargs):
        # Automatically sync make field
        if self.manufacturer:
            self.make = self.manufacturer.name

        # Ensure dealer is only set if the seller type is Dealer
        if self.seller_type != "Dealer":
            self.dealer = None
        super().save(*args, **kwargs)


class CarListingImage(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="car_listing_images/")

    def __str__(self):
        return f"Image for {self.car_listing}"


class CarListingFeature(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="features")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingEquipment(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="equipment")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingModification(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="modifications")
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CarListingKnownFlaw(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="known_flaws")
    description = models.TextField()

    def __str__(self):
        return f"Flaw for {self.car_listing}"


class CarListingVideoWalkaround(models.Model):
    car_listing = models.ForeignKey(CarListing, on_delete=models.CASCADE, related_name="videos")
    video_url = models.URLField()

    def __str__(self):
        return f"Video for {self.car_listing}"