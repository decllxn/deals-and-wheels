from rest_framework import permissions

class IsDealerOrAdmin(permissions.BasePermission):
    """
    Custom permission:
    - Only dealers or admins can create listings
    - Only the dealer who owns the listing (or admin) can update or delete
    - Read-only access is allowed for everyone
    """

    def has_permission(self, request, view):
        # Read-only methods are allowed for any user
        if request.method in permissions.SAFE_METHODS:
            return True

        # POST: Only allow if user has dealer_profile or is staff
        if request.method == "POST":
            return hasattr(request.user, "dealer_profile") or request.user.is_staff

        # PUT/PATCH/DELETE: permission is checked per object in has_object_permission
        return True

    def has_object_permission(self, request, view, obj):
        # Read-only permissions are allowed
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions only for the dealer who owns the listing or admin
        return (hasattr(request.user, "dealer_profile") and obj.dealer == request.user.dealer_profile) \
               or request.user.is_staff