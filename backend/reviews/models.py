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
    image = models.ImageField(upload_to='car_images/')
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.manufacturer.name}-{self.model_name}-{self.year}" if self.manufacturer else f"{self.model_name}-{self.year}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.manufacturer.name if self.manufacturer else 'Unknown'} {self.model_name} ({self.year})"


class Review(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reviews')
    manufacturer = models.ForeignKey(  # ✅ direct FK for querying
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviews'
    )
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    content = CKEditor5Field(config_name='default')
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)
    overall_rating = models.PositiveIntegerField(default=5)

    def save(self, *args, **kwargs):
        if not self.manufacturer and self.car and self.car.manufacturer:
            self.manufacturer = self.car.manufacturer
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Review for {self.car} by {self.author.username}"


class ReviewSection(models.Model):
    SECTION_CHOICES = [
        ('exterior', 'Exterior'),
        ('interior', 'Interior'),
        ('performance', 'Performance'),
        ('comfort', 'Comfort'),
        ('safety', 'Safety'),
        ('technology', 'Technology'),
        ('value', 'Value for Money'),
    ]

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='sections')
    section_type = models.CharField(max_length=50, choices=SECTION_CHOICES)
    description = models.TextField()
    rating = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.get_section_type_display()} - {self.review.car}"


class Rating(models.Model):
    review_section = models.ForeignKey(ReviewSection, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.user.username} - {self.score} for {self.review_section.section_type}"


class ReviewComment(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.review.title}"


class UserReviewFeedback(models.Model):
    SECTION_CHOICES = ReviewSection.SECTION_CHOICES

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='user_feedbacks')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    section = models.CharField(max_length=50, choices=SECTION_CHOICES)
    rating = models.PositiveIntegerField(default=5)
    feedback = models.TextField()

    def __str__(self):
        return f"Feedback from {self.user.username} for {self.review.car} ({self.section})"