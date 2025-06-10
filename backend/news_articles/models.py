from django.db import models
from django.contrib.auth import get_user_model
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
from django.utils import timezone
from django.utils.html import strip_tags
from manufacturers.models import Manufacturer
import math

User = get_user_model()


class NewsCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Hashtag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.name}"


class NewsItem(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to='news_images/')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='news_articles')
    content = CKEditor5Field(config_name='extends')
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)
    views = models.PositiveIntegerField(default=0)
    estimated_read_time = models.PositiveIntegerField(help_text="Estimated read time in minutes", blank=True, null=True)

    category = models.ForeignKey(NewsCategory, on_delete=models.SET_NULL, null=True, related_name='news')
    hashtags = models.ManyToManyField(Hashtag, blank=True, related_name='news_items')
    manufacturer = models.ForeignKey(  # ✅ NEW FIELD
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='news_items'
    )

    liked_by = models.ManyToManyField(User, blank=True, related_name='liked_news')
    shared_by = models.ManyToManyField(User, blank=True, related_name='shared_news')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.published_at:
            self.published_at = timezone.now()
        self.estimated_read_time = self.calculate_read_time()
        super().save(*args, **kwargs)

    def calculate_read_time(self):
        text = strip_tags(self.content)
        word_count = len(text.split())
        avg_reading_speed = 200  # words per minute
        return max(1, math.ceil(word_count / avg_reading_speed))

    def increment_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    def __str__(self):
        return self.title


class NewsComment(models.Model):
    news_item = models.ForeignKey(NewsItem, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, blank=True, related_name='liked_news_comments')

    def __str__(self):
        return f"{self.user.username} - {self.content[:30]}"


class CommentEmojiReaction(models.Model):
    comment = models.ForeignKey(NewsComment, on_delete=models.CASCADE, related_name='emoji_reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emoji = models.CharField(max_length=10)

    class Meta:
        unique_together = ('comment', 'user', 'emoji')