# dealers/urls.py
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'api', views.DealerViewSet, basename='dealer')
router.register(r'api-rating', views.DealerRatingViewSet, basename='dealer-rating') # Optional

urlpatterns = router.urls