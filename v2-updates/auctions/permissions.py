from rest_framework import permissions

class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow viewing auction listings without authentication,
    but require authentication for creating, updating, or deleting auctions.
    """
    def has_permission(self, request, view):
        # Allow read-only access (GET, HEAD, OPTIONS) to anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Require authentication for all other methods (POST, PUT, PATCH, DELETE)
        return request.user and request.user.is_authenticated