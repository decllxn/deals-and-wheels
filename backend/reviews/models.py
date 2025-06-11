from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django_ckeditor_5.fields import CKEditor5Field
from manufacturers.models import Manufacturer

User = get_user_model()


class Car(models.Model):
    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cars'
    )
    model_name = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    image = models.ImageField(upload_to='car_images/', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = f"{self.manufacturer.name}-{self.model_name}-{self.year}" if self.manufacturer else f"{self.model_name}-{self.year}"
            self.slug = slugify(base)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.manufacturer.name if self.manufacturer else 'Unknown'} {self.model_name} ({self.year})"


class Review(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reviews')
    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviews'
    )
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True)
    content = CKEditor5Field(config_name='default')
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)
    overall_rating = models.PositiveIntegerField(default=5)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.manufacturer and self.car and self.car.manufacturer:
            self.manufacturer = self.car.manufacturer
        if not self.slug:
            base = f"{self.car.slug}-{self.title}"
            self.slug = slugify(base)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Review: {self.title} ({self.car})"
