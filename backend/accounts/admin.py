from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from unfold.admin import ModelAdmin  # Extend from Unfold's ModelAdmin
from unfold.decorators import action  # Optional for custom actions
from .models import User

@admin.register(User)
class CustomUserAdmin(ModelAdmin, UserAdmin):
    list_display = (
        "username", "email", "first_name", "last_name", "phone", "is_staff", "is_active", "date_joined"
    )
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("username", "email", "first_name", "last_name", "phone")
    ordering = ("-date_joined",)

    # Add icon (uses tabler-icons by default)
    icon = "user"

    fieldsets = (
        (None, {
            "fields": ("email", "password"),
        }),
        ("Personal Info", {
            "fields": ("first_name", "last_name", "phone"),
        }),
        ("Permissions", {
            "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions"),
        }),
        ("Important Dates", {
            "fields": ("last_login", "date_joined"),
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "phone", "password1", "password2"),
        }),
    )

    filter_horizontal = ("groups", "user_permissions",)

    # --- Custom Action Example (Optional) ---
    @action(description='Mark selected users as active')
    def make_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, ngettext(
            '%d user was successfully marked as active.',
            '%d users were successfully marked as active.',
            updated,
        ) % updated, admin.SUCCESS)
    actions = ['make_active']
    # --- End Custom Action Example ---