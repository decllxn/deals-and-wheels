from pathlib import Path
import os
from dotenv import load_dotenv
from datetime import timedelta



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file
load_dotenv()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']


# Application definition

INSTALLED_APPS = [
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    "unfold.contrib.inlines",  # optional, if special inlines are needed
    "unfold.contrib.import_export",  # optional, if django-import-export package is used
    "unfold.contrib.guardian",  # optional, if django-guardian package is used
    "unfold.contrib.simple_history",  # optional, if django-simple-history package is used
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_comments',

    # 3rd party apps
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'dj_rest_auth',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.twitter_oauth2', # For X (Twitter OAuth2)
    'corsheaders',
    'crispy_forms',
    'fluent_comments',
    'taggit',
    'django_ckeditor_5',

    # local apps
    'accounts',
    'car_listings',
    'dealers',
    'blogs',
    'news_articles',
    'reviews',
    'guides',
    'automotive_glossary',
    'manufacturers',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',


    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Cors headers config
CORS_ALLOW_ALL_ORIGINS = True  # change later for security

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React local development
    "https://yourdomain.com",  # Production domain
]

CORS_ALLOW_CREDENTIALS = True

# AUTHENTICATION

SITE_ID = 1

AUTH_USER_MODEL = 'accounts.User'

# Updated settings to address deprecation warnings
ACCOUNT_LOGIN_METHODS = ['email'] # or ['username', 'email'] or ['username']
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_SESSION_REMEMBER = True


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        #'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend'
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',  # Removes Browsable API
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['email', 'profile'],
        'AUTH_PARAMS': {'access_type': 'online'},
    },
    'facebook': {
        'METHOD': 'oauth2',
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'FIELDS': ['id', 'email', 'name'],
    },
    'twitter': {  # X (formerly Twitter)
        'METHOD': 'oauth1',
        'SCOPE': [],
        'AUTH_PARAMS': {},
        'EXCHANGE_TOKEN': True,
    },
    'linkedin': {
        'SCOPE': ['r_emailaddress', 'r_liteprofile'],
        'PROFILE_FIELDS': ['id', 'first-name', 'last-name', 'email-address'],
    },
}


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_DIRS = [
    BASE_DIR / 'static',  # If you use a local static dir
]

STATIC_ROOT = BASE_DIR / 'staticfiles'






# UNFOLD ADMIN CUSTOMIZATION
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# See https://docs.djangoproject.com/en/3.2/ref/settings/#admins

UNFOLD = {

    "SITE_TITLE": "Deals & Wheels Admin",
    "SITE_HEADER": "Deals & Wheels",
    "SITE_TAGLINE": "Premium Car Auction Admin Panel",
    "SHOW_COUNTS": True,
    "DARK_MODE": True,
    "COLLAPSIBLE_NAV": True,
    "ENVIRONMENT": "production",
    "ENVIRONMENT_COLOR": "red",
    "SHOW_ACTIONS_ON_TOP": True
}

#  LOGGING
# ~~~~~~~~~~~~~~~~
# See https://docs.djangoproject.com/en/3.2/topics/logging/

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'auctions': {
          'handlers': ['console'],
            'level': 'ERROR',  # Or 'DEBUG' for more detailed logging during development
        },
    },
}



## ======  DJANGO-CKEDITOR 5 ==== ###
customColorPalette = [
        {
            'color': 'hsl(4, 90%, 58%)',
            'label': 'Red'
        },
        {
            'color': 'hsl(340, 82%, 52%)',
            'label': 'Pink'
        },
        {
            'color': 'hsl(291, 64%, 42%)',
            'label': 'Purple'
        },
        {
            'color': 'hsl(262, 52%, 47%)',
            'label': 'Deep Purple'
        },
        {
            'color': 'hsl(231, 48%, 48%)',
            'label': 'Indigo'
        },
        {
            'color': 'hsl(207, 90%, 54%)',
            'label': 'Blue'
        },
    ]

CKEDITOR_5_CUSTOM_CSS = 'path_to.css' # optional
CKEDITOR_5_FILE_STORAGE = None
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': {
            'items': [
                'heading', '|',
                'bold', 'italic', 'link',
                'bulletedList', 'numberedList', 'blockQuote',
                'Image', 'AlignLeft', 'AlignCenter', 'AlignRight',
                'imageUpload'
            ]
        },
        'fontColor': {
            'colors': [
                {'color': 'hsl(0, 0%, 0%)', 'label': 'Black', 'hasBorder': True},  # Default color
                {'color': 'hsl(0, 0%, 30%)', 'label': 'Dim grey'},
                {'color': 'hsl(0, 0%, 60%)', 'label': 'Grey'},
                {'color': 'hsl(0, 0%, 90%)', 'label': 'Light grey'},
                {'color': 'hsl(0, 0%, 100%)', 'label': 'White'},
                {'color': 'hsl(0, 100%, 50%)', 'label': 'Red'},
                {'color': 'hsl(120, 100%, 50%)', 'label': 'Green'},
                {'color': 'hsl(240, 100%, 50%)', 'label': 'Blue'}
            ],
            'columns': 5
        },
    },
    'extends': {
        'blockToolbar': [
            'paragraph', 'heading1', 'heading2', 'heading3',
            '|', 'bulletedList', 'numberedList', '|', 'blockQuote',
        ],
        'toolbar': {
            'items': [
                'heading', '|',
                'outdent', 'indent', '|',
                'bold', 'italic', 'link', 'underline', 'strikethrough',
                'code', 'subscript', 'superscript', 'highlight', '|',
                'codeBlock', 'sourceEditing', 'insertImage', 'mediaEmbed', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'blockQuote', 'imageUpload', '|',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                'alignment', '|',
                'Image', 'AlignLeft', 'AlignCenter', 'AlignRight',
                'horizontalLine', 'specialCharacters', '|',
                'removeFormat', '|',
                'insertTable', '|',
                'undo', 'redo'
            ],
            'shouldNotGroupWhenFull': True
        },
        'language': 'en',
        'image': {
            'toolbar': [
                'imageTextAlternative', '|',
                'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:side', '|',
                'linkImage', '|',
                'imageResize:original', 'imageResize:50', 'imageResize:75',
            ],
            'styles': ['full', 'side', 'alignLeft', 'alignRight', 'alignCenter'],
            'resizeOptions': [
                {'name': 'imageResize:original', 'label': 'Original'},
                {'name': 'imageResize:50', 'label': '50%'},
                {'name': 'imageResize:75', 'label': '75%'}
            ]
        },
        'table': {
            'contentToolbar': [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableProperties', 'tableCellProperties'
            ],
            'tableProperties': {
                'borderColors': [
                    {'color': 'hsl(0, 0%, 0%)', 'label': 'Black'},
                    {'color': 'hsl(0, 0%, 30%)', 'label': 'Dim grey'},
                    {'color': 'hsl(0, 0%, 60%)', 'label': 'Grey'},
                    {'color': 'hsl(0, 0%, 90%)', 'label': 'Light grey'},
                    {'color': 'hsl(0, 0%, 100%)', 'label': 'White', 'hasBorder': True}
                ],
                'backgroundColors': [
                    {'color': 'hsl(0, 0%, 90%)', 'label': 'Light grey'},
                    {'color': 'hsl(0, 0%, 80%)', 'label': 'Grey'},
                    {'color': 'hsl(240, 100%, 90%)', 'label': 'Light blue'},
                    {'color': 'hsl(0, 100%, 90%)', 'label': 'Light red'}
                ]
            },
            'tableCellProperties': {
                'borderColors': [
                    {'color': 'hsl(0, 0%, 0%)', 'label': 'Black'},
                    {'color': 'hsl(0, 0%, 30%)', 'label': 'Dim grey'},
                    {'color': 'hsl(0, 0%, 60%)', 'label': 'Grey'},
                    {'color': 'hsl(0, 0%, 90%)', 'label': 'Light grey'},
                    {'color': 'hsl(0, 0%, 100%)', 'label': 'White', 'hasBorder': True}
                ],
                'backgroundColors': [
                    {'color': 'hsl(0, 0%, 90%)', 'label': 'Light grey'},
                    {'color': 'hsl(0, 0%, 80%)', 'label': 'Grey'},
                    {'color': 'hsl(240, 100%, 90%)', 'label': 'Light blue'},
                    {'color': 'hsl(0, 100%, 90%)', 'label': 'Light red'}
                ]
            }
        },
        'heading': {
            'options': [
                {'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph'},
                {'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1'},
                {'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2'},
                {'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3'},
                {'model': 'heading4', 'view': 'h4', 'title': 'Heading 4', 'class': 'ck-heading_heading4'},
                {'model': 'heading5', 'view': 'h5', 'title': 'Heading 5', 'class': 'ck-heading_heading5'},
                {'model': 'heading6', 'view': 'h6', 'title': 'Heading 6', 'class': 'ck-heading_heading6'}
            ]
        },
    }
}


# Define a constant in settings.py to specify file upload permissions
CKEDITOR_5_FILE_UPLOAD_PERMISSION = "staff"  # Possible values: "staff", "authenticated"
CK_EDITOR_5_UPLOAD_FILE_VIEW_NAME = "blog_file"




#### Comment app
COMMENTS_APP = 'fluent_comments'
CRISPY_TEMPLATE_PACK = 'bootstrap4'
SITE_ID = 1
