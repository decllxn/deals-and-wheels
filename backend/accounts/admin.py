from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext
from unfold.admin import ModelAdmin
from unfold.decorators import action
from .models import User


@admin.register(User)
class CustomUserAdmin(ModelAdmin, BaseUserAdmin):
    """
    Custom admin for the User model using Unfold UI.
    Provides full CRUD, filtering, and custom actions.
    """

    # 🧱 Display columns in list view
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "phone",
        "is_staff",
        "is_active",
        "is_dealer",
        "date_joined",
    )
    list_filter = ("is_active", "is_staff", "is_superuser", "is_dealer", "groups")
    search_fields = ("email", "username", "first_name", "last_name", "phone")
    ordering = ("-date_joined",)

    # 🧭 Sidebar icon (Unfold feature)
    icon = "user"

    # 🗂️ Field sections in detail view
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        (_("Personal Info"), {"fields": ("first_name", "last_name", "phone")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_dealer",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important Dates"), {"fields": ("last_login", "date_joined")}),
    )

    # 🆕 Fields used when adding a user through the admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "username",
                "first_name",
                "last_name",
                "phone",
                "password1",
                "password2",
                "is_active",
                "is_staff",
                "is_superuser",
                "is_dealer",
                "groups",
                "user_permissions",
            ),
        }),
    )

    filter_horizontal = ("groups", "user_permissions")

    # ✅ Custom admin actions
    @action(description="Mark selected users as active")
    def make_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(
            request,
            ngettext(
                "%d user was successfully marked as active.",
                "%d users were successfully marked as active.",
                updated,
            )
            % updated,
            admin.SUCCESS,
        )

    @action(description="Deactivate selected users")
    def make_inactive(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(
            request,
            ngettext(
                "%d user was successfully deactivated.",
                "%d users were successfully deactivated.",
                updated,
            )
            % updated,
            admin.WARNING,
        )

    actions = ["make_active", "make_inactive"]