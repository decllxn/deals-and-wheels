from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django_ckeditor_5 import views as ckeditor5_views


urlpatterns = [
    path('dnw-admin-panel/', admin.site.urls),


    path('accounts/', include('accounts.urls')),
    path('vehicles/', include('car_listings.urls')),
    path('dealers/', include('dealers.urls')),
    path('blogs/api/', include('blogs.urls')),
    path('news-articles/', include('news_articles.urls')),
    path('reviews/', include('reviews.urls')),
    path('guides/', include('guides.urls')),
    path('glossary/', include('automotive_glossary.urls')),
    path('manufacturers/', include('manufacturers.urls')),

    # auth
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/social/', include('allauth.urls')),

    # ckeditor
    path('ckeditor/', include('django_ckeditor_5.urls')),
    path('upload/', ckeditor5_views.upload_file, name='blog_file'),


    # fluent comments
    path('comments/', include('fluent_comments.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)