from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

class Dealer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='dealer_profile')
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='dealers/logos/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(blank=True, null=True)
    average_rating = models.FloatField(default=0.0, blank=True, null=True)
    rating_count = models.PositiveIntegerField(default=0, blank=True, null=True)
    cars_sold_count = models.PositiveIntegerField(default=0, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def car_count(self):
        """Calculates the number of cars associated with this dealer (from auctions)."""
        return self.carauctions.count() # Use the correct related_name

class DealerRating(models.Model):
    dealer = models.ForeignKey(Dealer, related_name='ratings', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('dealer', 'user')

    def __str__(self):
        return f"Rating of {self.dealer.name} by {self.user.email}: {self.rating}"