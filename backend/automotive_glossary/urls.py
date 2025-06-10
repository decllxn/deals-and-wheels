from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GlossaryCategoryViewSet, GlossaryTermViewSet, TagViewSet, GlossaryTermRelatedLinkViewSet, CommentViewSet, RatingViewSet
from . import views

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'glossary-categories', GlossaryCategoryViewSet)
router.register(r'glossary-terms', GlossaryTermViewSet)
router.register(r'tags', TagViewSet)
router.register(r'glossary-term-related-links', GlossaryTermRelatedLinkViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'ratings', RatingViewSet)

# URL patterns
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/glossary/term/<int:term_id>/', views.glossary_term_view, name='glossary_term_detail_api'),
    path('api/latest/', views.latest_glossary_terms, name='latest_glossary_terms'),
]