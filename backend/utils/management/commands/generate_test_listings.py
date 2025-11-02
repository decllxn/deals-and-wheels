import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from pathlib import Path
from django.contrib.auth import get_user_model
from car_listings.models import CarListing, CarListingImage
from dealers.models import Dealer
from django.core.files.storage import default_storage
from uuid import uuid4

User = get_user_model()

# Default image path in your media folder
DEFAULT_IMAGE_PATH = "car_listing_images/amggle.jpg"

"""
Django Management Command: generate_test_listings
------------------------------------------------
This command generates random test car listings for development and testing.

Basic Usage:
    python manage.py generate_test_listings 10
    → Generates 10 random listings and assigns them to your first superuser.

Specify a seller (User):
    python manage.py generate_test_listings 10 --seller-id 1
    → Replace 1 with the user’s ID.

Assign to a dealer:
    python manage.py generate_car_listings 10 --dealer-id 3
    → Replace 3 with the dealer’s ID from your database.

Assign both seller and dealer:
    python manage.py generate_car_listings 15 --seller-id 1 --dealer-id 3

Default image setup (optional):
    Place an image file at:
        media/car_listing_images/amggle.jpg
    Or update DEFAULT_IMAGE_PATH in this script.

✅ Verify your data in the Django shell:
    python manage.py shell
    >>> from car_listings.models import CarListing
    >>> CarListing.objects.count()
    >>> CarListing.objects.first()

------------------------------------------------
"""

MAKES_MODELS = {
    "Toyota": ["Corolla", "Camry", "RAV4", "Hilux"],
    "Honda": ["Civic", "Accord", "CR-V", "Fit"],
    "Ford": ["Focus", "Mustang", "Explorer", "F-150"],
    "BMW": ["320i", "X5", "M3", "X3"],
}

YEARS = list(range(2005, 2024))
TRANSMISSIONS = [choice[0] for choice in CarListing.TRANSMISSION_CHOICES]
DRIVETRAINS = [choice[0] for choice in CarListing.DRIVETRAIN_CHOICES]
FUEL_TYPES = [choice[0] for choice in CarListing.FUEL_TYPE_CHOICES]
BODY_STYLES = [choice[0] for choice in CarListing.BODY_STYLE_CHOICES]
SELLER_TYPES = [choice[0] for choice in CarListing.SELLER_TYPE_CHOICES]

def generate_unique_vin():
    """Generate a unique 17-char VIN."""
    while True:
        vin = uuid4().hex[:17].upper()
        if not CarListing.objects.filter(vin=vin).exists():
            return vin

class Command(BaseCommand):
    help = "Generate random car listings for testing purposes"

    def add_arguments(self, parser):
        parser.add_argument("count", type=int, help="Number of test listings to generate")
        parser.add_argument("--dealer-id", type=int, help="ID of dealer to assign (optional)")
        parser.add_argument("--seller-id", type=int, help="ID of user to assign as seller (optional, default: first superuser)")

    def handle(self, *args, **options):
        count = options["count"]
        dealer_id = options.get("dealer_id")
        seller_id = options.get("seller_id")

        dealer = None
        if dealer_id:
            try:
                dealer = Dealer.objects.get(id=dealer_id)
            except Dealer.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Dealer {dealer_id} not found. Skipping dealer assignment."))

        # Get seller user
        if seller_id:
            try:
                seller = User.objects.get(id=seller_id)
            except User.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Seller {seller_id} not found. Using first superuser."))
                seller = User.objects.filter(is_superuser=True).first()
        else:
            seller = User.objects.filter(is_superuser=True).first()

        if not seller:
            self.stdout.write(self.style.ERROR("No valid seller found. Create a superuser first."))
            return

        self.stdout.write(self.style.NOTICE(f"Generating {count} test listings..."))

        for _ in range(count):
            make = random.choice(list(MAKES_MODELS.keys()))
            model = random.choice(MAKES_MODELS[make])
            year = random.choice(YEARS)
            price = random.randint(50000, 5000000)
            transmission = random.choice(TRANSMISSIONS)
            drivetrain = random.choice(DRIVETRAINS)
            fuel_type = random.choice(FUEL_TYPES)
            body_style = random.choice(BODY_STYLES)
            seller_type = random.choice(SELLER_TYPES)
            mileage = random.randint(0, 300000)
            is_featured = random.choice([True, False])
            has_warranty = random.choice([True, False])
            location = f"City-{random.randint(1,50)}"
            vin = generate_unique_vin()

            listing = CarListing.objects.create(
                title=f"{make} {model} {year}",
                make=make,
                model=model,
                year=year,
                price=price,
                transmission=transmission,
                drivetrain=drivetrain,
                fuel_type=fuel_type,
                body_style=body_style,
                seller_type=seller_type,
                mileage=mileage,
                is_featured=is_featured,
                has_warranty=has_warranty,
                location=location,
                vin=vin,
                dealer=dealer if seller_type == "Dealer" else None,
                seller=seller,
            )

            # Attach default image if exists
            if default_storage.exists(DEFAULT_IMAGE_PATH):
                CarListingImage.objects.create(car_listing=listing, image=DEFAULT_IMAGE_PATH)

            self.stdout.write(self.style.SUCCESS(f"✅ Created listing id={listing.id}: {listing.title}"))

        self.stdout.write(self.style.SUCCESS(f"🎉 Finished generating {count} test listings."))