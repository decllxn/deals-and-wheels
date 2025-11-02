import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.db import transaction

from reviews.models import Review, Car
from manufacturers.models import Manufacturer

User = get_user_model()

# ---------- Config ----------


# python manage.py generate_reviews 10
# or
# python manage.py generate_reviews 7 --author-id 2
# or
# python manage.py generate_reviews 5 --car-id 3


DEFAULT_MANUFACTURERS = [
    "Tesla", "Toyota", "Ford", "BMW", "Mercedes-Benz",
    "Audi", "Honda", "Nissan", "Chevrolet", "Hyundai",
]

# Optional example models per make (keeps model names short & realistic)
MAKE_MODELS = {
    "Tesla": ["Model 3", "Model Y", "Model S", "Model X"],
    "Toyota": ["Corolla", "Camry", "RAV4", "Supra"],
    "Ford": ["Mustang", "Focus", "Bronco", "F-150"],
    "BMW": ["320i", "M3", "X3", "X5"],
    "Mercedes-Benz": ["C300", "E350", "GLC300", "A200"],
    "Audi": ["A3", "A4", "Q5", "TT"],
    "Honda": ["Civic", "Accord", "CR-V", "Fit"],
    "Nissan": ["Altima", "Skyline", "GT-R", "Qashqai"],
    "Chevrolet": ["Camaro", "Impala", "Silverado", "Bolt"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe"],
}

# ---------- Helpers ----------
def max_len(model, field_name, default=50):
    try:
        return model._meta.get_field(field_name).max_length or default
    except Exception:
        return default

CAR_SLUG_MAX = max_len(Car, "slug", 50)
REVIEW_SLUG_MAX = max_len(Review, "slug", 50)
REVIEW_TITLE_MAX = max_len(Review, "title", 200)

def unique_slug_for(model, base_text, slug_field="slug", max_length=50):
    """
    Create a unique slug for `model` by slugifying `base_text`,
    truncating to `max_length`, and adding a numeric suffix when needed.
    """
    base = slugify(base_text)[:max_length].strip("-")
    if not base:
        base = "item"
    slug = base
    i = 2
    while model.objects.filter(**{slug_field: slug}).exists():
        suffix = f"-{i}"
        # trim base so base+suffix fits into max_length
        allow = max_length - len(suffix)
        slug = f"{base[:allow].rstrip('-')}{suffix}"
        i += 1
        if i > 9999:
            # extremely unlikely guard
            raise RuntimeError("Could not generate a unique slug after many attempts.")
    return slug

def html_paragraphs(num=5):
    from faker import Faker
    fake = Faker()
    return "".join(f"<p>{fake.sentence(nb_words=12)} {fake.paragraph(nb_sentences=3)}</p>" for _ in range(num))


# ---------- Command ----------
class Command(BaseCommand):
    help = "Generate random car reviews (and create manufacturers/cars if needed)."

    def add_arguments(self, parser):
        parser.add_argument("count", type=int, help="Number of reviews to generate")
        parser.add_argument("--author-id", type=int, help="Optional: ID of author to assign")
        parser.add_argument("--car-id", type=int, help="Optional: ID of car to always review")

    def handle(self, *args, **options):
        from faker import Faker
        fake = Faker()

        count = options["count"]
        author_id = options.get("author_id")
        car_id = options.get("car_id")

        # Pick author
        if author_id:
            author = User.objects.filter(id=author_id).first()
            if not author:
                self.stdout.write(self.style.WARNING(f"Author {author_id} not found. Using first superuser."))
                author = User.objects.filter(is_superuser=True).first()
        else:
            author = User.objects.order_by("?").first() or User.objects.filter(is_superuser=True).first()

        if not author:
            self.stdout.write(self.style.ERROR("No valid author found. Create a user first."))
            return

        # Ensure manufacturers exist
        if not Manufacturer.objects.exists():
            self.stdout.write(self.style.NOTICE("⚙️ No manufacturers found. Creating some..."))
            for name in DEFAULT_MANUFACTURERS:
                # Let Manufacturer model auto-set its slug (max_length=255)
                Manufacturer.objects.create(
                    name=name,
                    country=fake.country(),
                    founded_year=random.randint(1900, 2020),
                )

        # Ensure cars exist
        if not Car.objects.exists():
            self.stdout.write(self.style.NOTICE("⚙️ No cars found. Creating some..."))
            for manu in Manufacturer.objects.all():
                models_for_make = MAKE_MODELS.get(manu.name, [])
                if not models_for_make:
                    # Fallback short names to avoid long slugs/names
                    models_for_make = [fake.word().capitalize()[:20] for _ in range(3)]
                for model_name in models_for_make:
                    year = random.randint(2000, 2025)
                    car_slug = unique_slug_for(Car, f"{manu.name}-{model_name}-{year}", max_length=CAR_SLUG_MAX)
                    # Create car with a safe, unique slug (avoid hitting 50-char limit)
                    Car.objects.create(
                        manufacturer=manu,
                        model_name=model_name[: max_len(Car, "model_name", 100)],
                        year=year,
                        slug=car_slug,
                    )

        # Get cars
        cars_qs = Car.objects.all()
        if car_id:
            cars_qs = cars_qs.filter(id=car_id)
            if not cars_qs.exists():
                self.stdout.write(self.style.ERROR(f"No car with id={car_id} found."))
                return

        car_ids = list(cars_qs.values_list("id", flat=True))
        if not car_ids:
            self.stdout.write(self.style.ERROR("Still no cars found, something is wrong."))
            return

        self.stdout.write(self.style.NOTICE(f"🚗 Generating {count} reviews..."))

        created = 0
        with transaction.atomic():
            for _ in range(count):
                car = Car.objects.get(id=random.choice(car_ids))
                manu_name = car.manufacturer.name if car.manufacturer else ""
                # Build a concise title, then clamp to DB max_length
                raw_title = f"{car.year} {manu_name} {car.model_name} — {fake.sentence(nb_words=4)}"
                title = raw_title[:REVIEW_TITLE_MAX]

                # Generate a safe, unique slug (<= 50 chars for Review.slug)
                base_for_slug = f"{car.slug}-{title}"
                review_slug = unique_slug_for(Review, base_for_slug, max_length=REVIEW_SLUG_MAX)

                review = Review.objects.create(
                    car=car,
                    manufacturer=car.manufacturer,
                    author=author,
                    title=title,
                    summary=fake.text(max_nb_chars=150),
                    content=html_paragraphs(num=5),
                    overall_rating=random.randint(6, 10),
                    slug=review_slug,  # pre-set safe slug so model.save() won't regenerate
                    created_at=timezone.now(),
                    published_at=timezone.now() - timezone.timedelta(days=random.randint(0, 180)),
                )
                created += 1
                self.stdout.write(self.style.SUCCESS(f"✅ Created review id={review.id} for {car}"))

        self.stdout.write(self.style.SUCCESS(f"🎉 Finished generating {created} reviews."))
