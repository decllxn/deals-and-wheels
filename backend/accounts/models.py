from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class UserManager(BaseUserManager):
    """Custom manager for User model with email as the unique identifier."""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")

        email = self.normalize_email(email)

        # Auto-generate username if not provided
        username = extra_fields.get("username")
        if not username:
            username = slugify(email.split("@")[0])
            base_username = username
            counter = 1
            while self.model.objects.filter(username=username).exists():
                username = f"{base_username}-{counter}"
                counter += 1
            extra_fields["username"] = username

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model that uses email instead of username."""

    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    # Roles & Status
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_dealer = models.BooleanField(default=False)  # Flag for Dealer users

    date_joined = models.DateTimeField(default=timezone.now)

    # Explicitly redefine group relations to avoid clashes
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
        help_text="The groups this user belongs to.",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # email & password are handled by default

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email or self.username

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def role(self):
        """Helper to identify the user's role in plain text."""
        if self.is_superuser:
            return "Admin"
        elif self.is_dealer:
            return "Dealer"
        return "User"