from django.contrib.auth import get_user_model
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


# ==================================================
# 👤 User Profile (Retrieve + Update)
# ==================================================
class UserProfileView(RetrieveUpdateAPIView):
    """
    Allows authenticated users to view or update their profile.
    Endpoint: GET/PATCH /accounts/profile/api/
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ==================================================
# 📝 Register New User
# ==================================================
class RegisterView(APIView):
    """
    Registers a new user.
    Endpoint: POST /accounts/register/
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ==================================================
# 🔐 Email + Password Login
# ==================================================
class LoginView(APIView):
    """
    Logs a user in using email and password.
    Endpoint: POST /accounts/login/
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"message": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not user.check_password(password):
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Issue tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response(
            {
                "access": str(access),
                "refresh": str(refresh),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            status=status.HTTP_200_OK,
        )


# ==================================================
# 🔑 Google Login (JWT)
# ==================================================
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError
import uuid

User = get_user_model()

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # ✅ Verify Google token
            idinfo = id_token.verify_oauth2_token(token, requests.Request())

            email = idinfo.get("email")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")

            # ✅ Create or get user safely
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "is_active": True,
                    # Generate a unique username if not provided
                    "username": f"user_{uuid.uuid4().hex[:10]}",
                },
            )

            # ✅ Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                "access": str(access),
                "refresh": str(refresh),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "created": created,
            }, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError as e:
            return Response({"error": f"Database error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)