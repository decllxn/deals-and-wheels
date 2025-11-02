# utils/management/commands/duplicate_listings.py
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone
from pathlib import Path
from uuid import uuid4

from car_listings.models import (
    CarListing,
    CarListingImage,
    CarListingFeature,
    CarListingEquipment,
    CarListingModification,
    CarListingKnownFlaw,
    CarListingVideoWalkaround,
)
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

# command: python manage.py duplicate_listings 1 2 --vin-prefix DEMO

class Command(BaseCommand):
    help = "Duplicate a car listing multiple times for testing."

    def add_arguments(self, parser):
        parser.add_argument("listing_id", type=int, help="ID of the original listing to copy")
        parser.add_argument("count", type=int, help="How many duplicates to create")
        parser.add_argument(
            "--copy-files",
            action="store_true",
            help="Physically duplicate image files in storage (default: reuse same file path).",
        )
        parser.add_argument(
            "--vin-prefix",
            type=str,
            default="VINTEST",
            help="Prefix for generated VINs (default: VINTEST).",
        )

    def handle(self, *args, **options):
        listing_id = options["listing_id"]
        count = options["count"]
        copy_files = options["copy_files"]
        vin_prefix = options["vin_prefix"]

        try:
            original = (
                CarListing.objects
                .select_related("dealer", "manufacturer", "seller")
                .prefetch_related(
                    "images",
                    "features",
                    "equipment",
                    "modifications",
                    "known_flaws",
                    "videos",
                )
                .get(id=listing_id)
            )
        except CarListing.DoesNotExist:
            raise CommandError(f"Listing {listing_id} does not exist.")

        self.stdout.write(self.style.NOTICE(
            f"Duplicating listing #{listing_id} → {count} copies (copy_files={copy_files})"
        ))

        for i in range(count):
            with transaction.atomic():
                # 1) Clone CarListing
                clone = CarListing.objects.get(pk=original.pk)
                clone.pk = None  # reset to create new record
                clone.created_at = timezone.now()
                clone.updated_at = timezone.now()

                # Generate unique VIN
                if original.vin:
                    clone.vin = f"{vin_prefix}-{i+1:05d}"
                else:
                    clone.vin = f"{vin_prefix}-{uuid4().hex[:8]}"

                clone.save()

                # 2) Clone related objects
                # Features
                for feat in original.features.all():
                    CarListingFeature.objects.create(car_listing=clone, name=feat.name)

                # Equipment
                for eq in original.equipment.all():
                    CarListingEquipment.objects.create(car_listing=clone, name=eq.name)

                # Modifications
                for mod in original.modifications.all():
                    CarListingModification.objects.create(car_listing=clone, name=mod.name)

                # Known flaws
                for flaw in original.known_flaws.all():
                    CarListingKnownFlaw.objects.create(car_listing=clone, description=flaw.description)

                # Videos
                for vid in original.videos.all():
                    CarListingVideoWalkaround.objects.create(car_listing=clone, video_url=vid.video_url)

                # 3) Clone images
                for img in original.images.all():
                    if not img.image:
                        continue

                    if copy_files:
                        src_path = img.image.name
                        filename = Path(src_path).name
                        new_path = f"car_listing_images/copy_{clone.pk}_{uuid4().hex[:6]}_{filename}"

                        with default_storage.open(src_path, "rb") as f:
                            data = f.read()
                        default_storage.save(new_path, ContentFile(data))

                        CarListingImage.objects.create(car_listing=clone, image=new_path)
                    else:
                        CarListingImage.objects.create(car_listing=clone, image=img.image)

                self.stdout.write(self.style.SUCCESS(f"✅ Created clone id={clone.pk}"))

        self.stdout.write(self.style.SUCCESS(
            f"🎉 Done. Duplicated listing {listing_id} {count} time(s)."
        ))