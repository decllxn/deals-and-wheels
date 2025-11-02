from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, UserProfileView, GoogleLoginView

urlpatterns = [
    # 🔐 Authentication Endpoints
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),

    # 👤 User Profile
    path("profile/api/", UserProfileView.as_view(), name="user-profile"),

    # 🔄 JWT Token Handling
    path("token/api/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/api/", TokenRefreshView.as_view(), name="token_refresh"),
]