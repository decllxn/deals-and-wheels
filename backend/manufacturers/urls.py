from django.urls import path, include
from rest_framework.routers import DefaultRouter
from manufacturers.views import ManufacturerViewSet

router = DefaultRouter()
router.register(r'api', ManufacturerViewSet, basename='manufacturer')

urlpatterns = [
    path('', include(router.urls)),

    # Add this line for slug-based retrieve view:
    path(
        'manufacturers/api/<slug:slug>/',
        ManufacturerViewSet.as_view({'get': 'retrieve'}),
        name='manufacturer-detail-slug'
    ),

    # Optional: If you want blogs via slug
    path(
        'manufacturers/api/<slug:slug>/blogs/',
        ManufacturerViewSet.as_view({'get': 'blogs'}),
        name='manufacturer-blogs-slug'
    ),
    path('manufacturers/api/<slug:slug>/listings/', 
        ManufacturerViewSet.as_view({'get': 'listings'}), 
        name='manufacturer-listings'
    ),
    path(
        'manufacturers/api/<slug:slug>/news/',
        ManufacturerViewSet.as_view({'get': 'news'}),
        name='manufacturer-news'
    ),
    path(
        'manufacturers/api/<slug:slug>/reviews/',
        ManufacturerViewSet.as_view({'get': 'reviews'}),
        name='manufacturer-reviews'
    ),

]
