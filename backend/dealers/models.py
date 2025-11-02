from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.utils import timezone


class Dealer(models.Model):
    """
    Represents a vehicle dealer registered on the platform.
    Each dealer is associated with one user account.
    """

    # 1️⃣ User link
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="dealer_profile",
        help_text="The user account associated with this dealer."
    )

    # 2️⃣ Business information
    name = models.CharField(max_length=255, unique=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    business_type = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    contact_number = models.CharField(max_length=50, blank=True, null=True)

    # 3️⃣ Branding & description
    logo = models.ImageField(upload_to="dealers/logos/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    # 4️⃣ Verification
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(blank=True, null=True)

    # 5️⃣ Performance & statistics
    average_rating = models.FloatField(default=0.0)
    rating_count = models.PositiveIntegerField(default=0)
    cars_listed_count = models.PositiveIntegerField(default=0)
    cars_sold_count = models.PositiveIntegerField(default=0)

    # 6️⃣ Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Dealer"
        verbose_name_plural = "Dealers"

    def __str__(self):
        return self.name or f"Dealer ({self.user.email})"

    # -----------------------------
    # Derived & utility properties
    # -----------------------------
    @property
    def total_cars(self):
        """Return total number of cars handled by this dealer (listed + sold)."""
        return (self.cars_listed_count or 0) + (self.cars_sold_count or 0)

    # -----------------------------
    # Business logic
    # -----------------------------
    def update_stats(self):
        """
        Recalculate key dealer stats from related CarListing data.
        Should be called whenever a listing is created or marked sold.
        """
        # Lazy import to prevent circular dependency
        from listings.models import CarListing

        total_listed = CarListing.objects.filter(dealer=self).count()
        total_sold = CarListing.objects.filter(dealer=self, is_sold=True).count()

        self.cars_listed_count = total_listed
        self.cars_sold_count = total_sold
        self.save(update_fields=["cars_listed_count", "cars_sold_count", "updated_at"])

    def verify(self):
        """Mark dealer as verified and record the timestamp."""
        self.is_verified = True
        self.verification_date = timezone.now()
        self.save(update_fields=["is_verified", "verification_date"])


# -------------------------------------------------------------------
# Dealer Rating Model
# -------------------------------------------------------------------
class DealerRating(models.Model):
    """
    Represents a user rating/review of a specific dealer.
    Each user can rate a dealer only once.
    """

    dealer = models.ForeignKey(
        Dealer,
        related_name="ratings",
        on_delete=models.CASCADE,
        help_text="The dealer being reviewed."
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        help_text="The user who provided the rating."
    )
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating value between 1 and 5."
    )
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("dealer", "user")
        ordering = ["-created_at"]
        verbose_name = "Dealer Rating"
        verbose_name_plural = "Dealer Ratings"

    def __str__(self):
        return f"{self.user.email} → {self.dealer.name}: {self.rating}/5"

    # -----------------------------
    # Logic
    # -----------------------------
    def save(self, *args, **kwargs):
        """Override save to update dealer's average rating automatically."""
        super().save(*args, **kwargs)
        self.update_dealer_rating()

    def update_dealer_rating(self):
        """Recalculate dealer’s average rating and rating count."""
        dealer = self.dealer
        all_ratings = dealer.ratings.all()

        avg_rating = all_ratings.aggregate(models.Avg("rating"))["rating__avg"] or 0
        count = all_ratings.count()

        dealer.average_rating = round(avg_rating, 2)
        dealer.rating_count = count
        dealer.save(update_fields=["average_rating", "rating_count"])