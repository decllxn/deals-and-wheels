# utils/management/commands/generate_blogs.py
import base64
import random
from uuid import uuid4
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify
from django.db import transaction
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.contrib.auth import get_user_model

from faker import Faker

from blogs.models import Blog, Category, Hashtag
from manufacturers.models import Manufacturer

User = get_user_model()
fake = Faker()

# ---------- Configuration ----------
DEFAULT_MANUFACTURERS = [
    "Tesla", "Toyota", "Ford", "BMW", "Mercedes-Benz",
    "Audi", "Honda", "Nissan", "Chevrolet", "Hyundai",
]

DEFAULT_CATEGORIES = [
    "News", "Reviews", "Guides", "Industry", "Ownership"
]

DEFAULT_HASHTAGS = [
    "ev", "performance", "luxury", "budget", "family", "offroad", "suv"
]

# default image path inside MEDIA_ROOT (will be created if missing)
DEFAULT_IMAGE_PATH = "blog_images/default_blog.png"

# 1x1 PNG base64 (tiny placeholder). We'll write this if default image missing.
_ONE_PIXEL_PNG_B64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
)


# ---------- Helpers ----------
def max_len(model, field_name, default=50):
    try:
        return model._meta.get_field(field_name).max_length or default
    except Exception:
        return default


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
        allow = max_length - len(suffix)
        slug = f"{base[:allow].rstrip('-')}{suffix}"
        i += 1
        if i > 9999:
            raise RuntimeError("Could not generate a unique slug after many attempts.")
    return slug


def ensure_default_image(path=DEFAULT_IMAGE_PATH):
    """Make sure default image exists in storage, otherwise create a tiny PNG."""
    if default_storage.exists(path):
        return path
    # create parent dirs (default_storage will handle paths)
    data = base64.b64decode(_ONE_PIXEL_PNG_B64)
    default_storage.save(path, ContentFile(data))
    return path


def copy_image(src_path):
    """
    Copy src_path file to a new path (unique) and return the new path.
    Uses default_storage; returns the filename relative to storage.
    """
    try:
        with default_storage.open(src_path, "rb") as f:
            data = f.read()
    except Exception:
        # fallback — return source path if read fails
        return src_path

    new_filename = f"blog_images/blog_{uuid4().hex[:10]}.png"
    default_storage.save(new_filename, ContentFile(data))
    return new_filename


def html_paragraphs(paragraphs=4):
    """Return some basic HTML content for CKEditor field."""
    return "".join(f"<p>{fake.sentence(nb_words=8)} {fake.paragraph(nb_sentences=3)}</p>" for _ in range(paragraphs))


# ---------- Command ----------
class Command(BaseCommand):
    help = "Generate test blog posts (creates manufacturers/categories/hashtags if missing)."

    def add_arguments(self, parser):
        parser.add_argument("count", type=int, help="Number of blog posts to generate")
        parser.add_argument("--author-id", type=int, help="Optional: assign a specific author user id")
        parser.add_argument("--category-id", type=int, help="Optional: force all blogs into a category id")
        parser.add_argument("--manufacturer-id", type=int, help="Optional: force manufacturer id for blogs")
        parser.add_argument(
            "--attach-image",
            action="store_true",
            help="Copy the default image for each blog (makes each blog have its own file).",
        )
        parser.add_argument(
            "--published",
            action="store_true",
            help="Mark generated blogs as published (sets published_at to now).",
        )
        parser.add_argument(
            "--tags-count",
            type=int,
            default=2,
            help="How many hashtags to attach per blog (default: 2).",
        )

    def handle(self, *args, **options):
        count = options["count"]
        author_id = options.get("author_id")
        category_id = options.get("category_id")
        manufacturer_id = options.get("manufacturer_id")
        attach_image = options.get("attach_image", False)
        published_flag = options.get("published", False)
        tags_count = max(0, int(options.get("tags_count", 2)))

        # Determine field length limits
        BLOG_SLUG_MAX = max_len(Blog, "slug", 50)
        BLOG_TITLE_MAX = max_len(Blog, "title", 255)

        # Find author
        if author_id:
            author = User.objects.filter(id=author_id).first()
            if not author:
                self.stdout.write(self.style.WARNING(f"Author with id={author_id} not found. Falling back to a random user / superuser."))
                author = User.objects.order_by("?").first() or User.objects.filter(is_superuser=True).first()
        else:
            author = User.objects.order_by("?").first() or User.objects.filter(is_superuser=True).first()

        if not author:
            self.stdout.write(self.style.ERROR("No user found to assign as author. Create at least one user."))
            return

        # Ensure manufacturers exist
        if not Manufacturer.objects.exists():
            self.stdout.write(self.style.NOTICE("⚙️ No manufacturers found. Creating defaults..."))
            for name in DEFAULT_MANUFACTURERS:
                Manufacturer.objects.create(name=name)

        # Ensure categories exist
        if not Category.objects.exists():
            self.stdout.write(self.style.NOTICE("⚙️ No categories found. Creating defaults..."))
            for cat in DEFAULT_CATEGORIES:
                Category.objects.create(name=cat)

        # Ensure hashtags exist
        if not Hashtag.objects.exists():
            self.stdout.write(self.style.NOTICE("⚙️ No hashtags found. Creating defaults..."))
            for tag in DEFAULT_HASHTAGS:
                Hashtag.objects.create(name=tag)

        # Ensure default image
        default_img_path = ensure_default_image(DEFAULT_IMAGE_PATH)

        # Prepare pools
        manufacturers = list(Manufacturer.objects.all())
        categories = list(Category.objects.all())
        hashtags = list(Hashtag.objects.all())

        # If forced category/manufacturer provided, validate them
        forced_category = None
        if category_id:
            forced_category = Category.objects.filter(id=category_id).first()
            if not forced_category:
                self.stdout.write(self.style.WARNING(f"Category id={category_id} not found. Using random categories."))

        forced_manufacturer = None
        if manufacturer_id:
            forced_manufacturer = Manufacturer.objects.filter(id=manufacturer_id).first()
            if not forced_manufacturer:
                self.stdout.write(self.style.WARNING(f"Manufacturer id={manufacturer_id} not found. Using random manufacturers."))

        created = 0
        self.stdout.write(self.style.NOTICE(f"Generating {count} blog posts..."))

        with transaction.atomic():
            for _ in range(count):
                # pick manufacturer and category
                manufacturer = forced_manufacturer if forced_manufacturer else (random.choice(manufacturers) if manufacturers else None)
                category = forced_category if forced_category else (random.choice(categories) if categories else None)

                # Build a concise title (clamped to DB max)
                year = random.randint(1995, 2025)
                short_title = f"{manufacturer.name if manufacturer else ''} {fake.word().capitalize()} {year} — {fake.sentence(nb_words=4)}"
                title = short_title[:BLOG_TITLE_MAX].strip()

                # Create slug ensuring uniqueness and respecting DB length
                slug_base = f"{slugify(title)}"
                slug = unique_slug_for(Blog, slug_base, slug_field="slug", max_length=BLOG_SLUG_MAX)

                # Decide image path (copy or reuse)
                if attach_image:
                    img_path = copy_image(default_img_path)
                else:
                    img_path = default_img_path

                # Build HTML content
                content_html = html_paragraphs(paragraphs=random.randint(3, 7))

                # Create Blog instance
                published_at = timezone.now() if published_flag else None

                # Use a safe creation; Blog.image is required in your model, so we pass path string
                try:
                    blog = Blog.objects.create(
                        title=title,
                        slug=slug,
                        image=img_path,
                        author=author,
                        content=content_html,
                        published_at=published_at,
                        is_published=bool(published_flag),
                        category=category,
                        manufacturer=manufacturer,
                        created_at=timezone.now(),
                    )
                except Exception as exc:
                    # On rare error (say, field length or db error), log and skip
                    self.stdout.write(self.style.ERROR(f"Failed to create blog '{title}': {exc}"))
                    continue

                # Attach some hashtags
                if hashtags and tags_count > 0:
                    count_tags = min(tags_count, len(hashtags))
                    chosen = random.sample(hashtags, count_tags)
                    blog.hashtags.add(*chosen)

                created += 1
                self.stdout.write(self.style.SUCCESS(f"✅ Created blog id={blog.id} title='{blog.title[:60]}'"))

        self.stdout.write(self.style.SUCCESS(f"🎉 Finished creating {created} blog(s)."))