from pathlib import Path
import os
from dotenv import load_dotenv
from datetime import timedelta
from celery.schedules import crontab
from decouple import config


# ==================================================
# BASE & ENVIRONMENT CONFIG
# ==================================================
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = True
ALLOWED_HOSTS = ["*"]

# ==================================================
# APPLICATIONS
# ==================================================
INSTALLED_APPS = [
    # Unfold Admin
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",
    "unfold.contrib.import_export",
    "unfold.contrib.guardian",
    "unfold.contrib.simple_history",

    # Django Core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_comments",

    # Third-Party Apps
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "dj_rest_auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.twitter_oauth2",
    "corsheaders",
    "crispy_forms",
    "fluent_comments",
    "taggit",
    "django_ckeditor_5",
    "django_celery_results",
    "django_celery_beat",

    # Local Apps
    "accounts",
    "car_listings",
    "dealers",
    "blogs",
    "news_articles",
    "reviews",
    "guides",
    "automotive_glossary",
    "manufacturers",
    "api",
    "utils",
    "chat",
    "dealer_dashboard",
    "billing",
]

# ==================================================
# MIDDLEWARE
# ==================================================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

# ==================================================
# URLS & WSGI
# ==================================================
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

# ==================================================
# DATABASE
# ==================================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# ==================================================
# AUTHENTICATION & USERS
# ==================================================
AUTH_USER_MODEL = "accounts.User"
SITE_ID = 1

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

# ✅ Updated (no deprecations)
ACCOUNT_LOGIN_METHODS = {"email"}  # Replaces ACCOUNT_AUTHENTICATION_METHOD
ACCOUNT_SIGNUP_FIELDS = ["email*", "password1*", "password2*"]  # Replaces deprecated fields
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_SESSION_REMEMBER = True

# ==================================================
# REST FRAMEWORK / JWT
# ==================================================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (),
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

REST_USE_JWT = True

# ==================================================
# SOCIAL AUTH (Google, Facebook, Twitter)
# ==================================================
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": ["email", "profile"],
        "AUTH_PARAMS": {"access_type": "online"},
    },
    "facebook": {
        "METHOD": "oauth2",
        "SCOPE": ["email", "public_profile"],
        "AUTH_PARAMS": {"auth_type": "reauthenticate"},
        "FIELDS": ["id", "email", "name"],
    },
    "twitter_oauth2": {
        "SCOPE": ["tweet.read", "users.read", "offline.access"],
        "AUTH_PARAMS": {},
    },
}

# ==================================================
# TEMPLATES
# ==================================================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ==================================================
# CORS
# ==================================================
CORS_ALLOW_ALL_ORIGINS = True  # Relax for dev; restrict later
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://yourdomain.com",
]

# ==================================================
# STATIC & MEDIA
# ==================================================
STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ==================================================
# INTERNATIONALIZATION
# ==================================================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Nairobi"
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ==================================================
# UNFOLD ADMIN
# ==================================================
UNFOLD = {
    "SITE_TITLE": "Deals & Wheels Admin",
    "SITE_HEADER": "Deals & Wheels",
    "SITE_TAGLINE": "Premium Car Market-Place Admin Panel",
    "SHOW_COUNTS": True,
    "DARK_MODE": True,
    "COLLAPSIBLE_NAV": True,
    "ENVIRONMENT": "production",
    "ENVIRONMENT_COLOR": "red",
    "SHOW_ACTIONS_ON_TOP": True,
}

# ==================================================
# LOGGING
# ==================================================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "loggers": {
        "auctions": {
            "handlers": ["console"],
            "level": "ERROR",
        },
    },
}

# ==================================================
# CKEDITOR 5 CONFIGURATION
# ==================================================
CKEDITOR_5_CUSTOM_CSS = "path_to.css"
CKEDITOR_5_FILE_STORAGE = None
CKEDITOR_5_FILE_UPLOAD_PERMISSION = "staff"
CK_EDITOR_5_UPLOAD_FILE_VIEW_NAME = "blog_file"

CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": {
            "items": [
                "heading", "|",
                "bold", "italic", "link",
                "bulletedList", "numberedList", "blockQuote",
                "Image", "AlignLeft", "AlignCenter", "AlignRight",
                "imageUpload",
            ]
        },
        "html_purify": False,
    },
}

# ==================================================
# COMMENTS / CRISPY FORMS
# ==================================================
COMMENTS_APP = "fluent_comments"
CRISPY_TEMPLATE_PACK = "bootstrap4"



ASGI_APPLICATION = "backend.asgi.application"
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {"hosts": [("127.0.0.1", 6379)]},
    },
}

CELERY_BROKER_URL = "redis://localhost:6379/0"
CELERY_RESULT_BACKEND = "redis://localhost:6379/0"

CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "Africa/Nairobi"

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}

CELERY_RESULT_BACKEND = "django-db"
CELERY_CACHE_BACKEND = "default" 
CELERY_BEAT_SCHEDULE = {
    "generate_monthly_invoices": {
        "task": "billing.tasks.generate_monthly_invoices",
        "schedule": crontab(day_of_month=1, hour=0, minute=0),
    },
    "process_recurring_payments": {
        "task": "billing.tasks.process_recurring_payments",
        "schedule": crontab(hour=0, minute=0),
    },
    "sync_subscription_statuses": {
        "task": "billing.tasks.sync_subscription_statuses",
        "schedule": crontab(hour=1, minute=0),
    },
    "retry_failed_payments": {
        "task": "billing.tasks.retry_failed_payments",
        "schedule": crontab(hour="*/6", minute=0),
    },

    # 🚗 Dealer metrics task
    "compute_daily_dealer_metrics": {
        "task": "dealer_dashboard.tasks.compute_daily_metrics_for_date",
        "schedule": crontab(hour=0, minute=30),
    },
}
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"  # prints to terminal
DEFAULT_FROM_EMAIL = "Deals & Wheels <no-reply@dealsandwheels.com>"


MPESA_CONSUMER_KEY = config("MPESA_CONSUMER_KEY", default="")
MPESA_CONSUMER_SECRET = config("MPESA_CONSUMER_SECRET", default="")
MPESA_SHORTCODE = config("MPESA_SHORTCODE", default="174379")
MPESA_PASSKEY = config("MPESA_PASSKEY", default="")
MPESA_CALLBACK_URL = config("MPESA_CALLBACK_URL", default="")

APPEND_SLASH = False


PAYPAL_CLIENT_ID = config("PAYPAL_CLIENT_ID")
PAYPAL_SECRET = config("PAYPAL_SECRET")
PAYPAL_MODE = config("PAYPAL_MODE")
PAYPAL_WEBHOOK_ID = config("PAYPAL_WEBHOOK_ID")