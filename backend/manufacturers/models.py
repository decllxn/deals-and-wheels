from django.db import models
from django.utils.text import slugify

class Manufacturer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='manufacturer_image/', blank=True, null=True)
    logo = models.ImageField(upload_to='manufacturer_logos/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    history = models.TextField(blank=True, null=True)
    achievements = models.JSONField(blank=True, null=True, default=list)

    country = models.CharField(max_length=100, blank=True, null=True)
    founded_year = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Manufacturer'
        verbose_name_plural = 'Manufacturers'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Auto-generate slug on save
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)