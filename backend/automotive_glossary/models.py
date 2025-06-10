from django.db import models
from django.contrib.auth import get_user_model
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
from django.utils import timezone
import math

User = get_user_model()

class GlossaryCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class GlossaryTerm(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    definition = CKEditor5Field(config_name='extends')  # Rich text editor for the term's content
    category = models.ForeignKey(GlossaryCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='glossary_terms')
    related_terms = models.ManyToManyField('self', blank=True, related_name='related_glossary_terms', symmetrical=False)  # Changed related_name
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='glossary_terms')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    seo_title = models.CharField(max_length=150, blank=True)
    seo_description = models.TextField(max_length=300, blank=True)
    thumbnail_image = models.ImageField(upload_to='glossary_thumbnails/', null=True, blank=True)
    likes = models.ManyToManyField(User, related_name='liked_glossary_terms', blank=True)
    views = models.PositiveIntegerField(default=0)
    estimated_read_time = models.PositiveIntegerField(null=True, blank=True)  # in minutes

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        # Estimate read time (assuming average reading speed is 200 words per minute)
        if self.definition:
            word_count = len(self.definition.split())
            self.estimated_read_time = math.ceil(word_count / 200)

        super().save(*args, **kwargs)

    def increment_views(self):
        self.views += 1
        self.save()

    def __str__(self):
        return self.title



class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    glossary_terms = models.ManyToManyField(GlossaryTerm, blank=True, related_name='tags')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class GlossaryTermRelatedLink(models.Model):
    url = models.URLField()
    title = models.CharField(max_length=200)
    glossary_term = models.ForeignKey(GlossaryTerm, on_delete=models.CASCADE, related_name='related_links')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    glossary_term = models.ForeignKey(GlossaryTerm, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='replies')
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    def __str__(self):
        return f'Comment by {self.user} on {self.glossary_term.title}'


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    glossary_term = models.ForeignKey(GlossaryTerm, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Rating by {self.user} for {self.glossary_term.title}'