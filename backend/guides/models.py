from django.db import models
from django.contrib.auth import get_user_model
from django_ckeditor_5.fields import CKEditor5Field
import math
import re
from django.utils.html import strip_tags
from django.utils.text import slugify

User = get_user_model()

class GuideCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    def __str__(self):
        return self.name

        
class Hashtag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.name}"


class Guide(models.Model):
    GUIDE_TYPE_CHOICES = [
        ('BUYING', 'Buying Guide'),
        ('SELLING', 'Selling Guide'),
    ]

    DIFFICULTY_LEVEL_CHOICES = [
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('EXPERT', 'Expert'),
    ]

    # Core Fields
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    cover_image = models.ImageField(upload_to='guide_covers/')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='guides')
    content = CKEditor5Field(config_name='extends')
    excerpt = models.TextField(max_length=400, blank=True)
    guide_type = models.CharField(max_length=10, choices=GUIDE_TYPE_CHOICES)
    category = models.ForeignKey(GuideCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='guides')
    hashtags = models.ManyToManyField(Hashtag, blank=True)
    estimated_read_time = models.PositiveIntegerField(help_text="Estimated read time in minutes")

    # Meta & Analytics
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    publish_date = models.DateTimeField(null=True, blank=True)

    # Optional Enhancements
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_LEVEL_CHOICES, blank=True, null=True)
    call_to_action_text = models.CharField(max_length=100, blank=True)
    call_to_action_url = models.URLField(blank=True)

    seo_title = models.CharField(max_length=150, blank=True)
    seo_description = models.TextField(max_length=300, blank=True)
    thumbnail_alt_text = models.CharField(max_length=150, blank=True)

    class Meta:
        ordering = ['-publish_date', '-created_at']


    def calculate_read_time(self):
        """Estimate read time in minutes based on word count."""
        text = strip_tags(self.content)
        word_count = len(re.findall(r'\w+', text))
        words_per_minute = 200  # standard reading speed
        return math.ceil(word_count / words_per_minute)

    def save(self, *args, **kwargs):
        if not self.estimated_read_time:
            self.estimated_read_time = self.calculate_read_time()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
