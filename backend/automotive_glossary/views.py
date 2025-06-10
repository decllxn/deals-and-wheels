from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import GlossaryCategory, GlossaryTerm, Tag, GlossaryTermRelatedLink, Comment, Rating
from .serializers import GlossaryCategorySerializer, GlossaryTermSerializer, TagSerializer, GlossaryTermRelatedLinkSerializer, CommentSerializer, RatingSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from .utils import get_content_based_recommendations
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view



class GlossaryCategoryViewSet(viewsets.ModelViewSet):
    queryset = GlossaryCategory.objects.all()
    serializer_class = GlossaryCategorySerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['name']
    ordering_fields = ['name', 'slug']
    ordering = ['name']

class GlossaryTermViewSet(viewsets.ModelViewSet):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filterset_fields = ['category', 'published', 'author']
    search_fields = ['title', 'definition', 'seo_title', 'seo_description']
    ordering_fields = ['created_at', 'title', 'updated_at']
    ordering = ['created_at']
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        glossary_term = self.get_object()
        glossary_term.increment_views()
        return Response({'status': 'views incremented'})

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['name']
    ordering_fields = ['name']
    ordering = ['name']

class GlossaryTermRelatedLinkViewSet(viewsets.ModelViewSet):
    queryset = GlossaryTermRelatedLink.objects.all()
    serializer_class = GlossaryTermRelatedLinkSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['glossary_term']
    ordering_fields = ['created_at']
    ordering = ['created_at']

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['glossary_term', 'parent_comment']
    ordering_fields = ['created_at']
    ordering = ['created_at']

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        comment = self.get_object()
        user = request.user
        if user in comment.likes.all():
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        return Response({'status': 'like toggled'})

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['glossary_term', 'user']
    ordering_fields = ['created_at', 'rating']
    ordering = ['created_at']

    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        glossary_term = self.get_object()
        rating_value = request.data.get('rating')
        user = request.user
        rating, created = Rating.objects.update_or_create(
            glossary_term=glossary_term, user=user,
            defaults={'rating': rating_value}
        )
        return Response({'status': 'rating submitted'})

def glossary_term_view(request, term_id):
    # If the user is authenticated, get their ID
    user_id = request.user.id if request.user.is_authenticated else None

    # Retrieve the glossary term by its ID, or return a 404 error if not found
    term = get_object_or_404(GlossaryTerm, id=term_id)

    # Get hybrid recommendations for the glossary term and user
    recommendations = get_content_based_recommendations(user_id, term_id, content_weight=0.6, collaborative_weight=0.4)

    # Serialize the glossary term and recommendations to a dictionary
    term_data = {
        'id': term.id,
        'title': term.title,
        'slug': term.slug,
        'definition': term.definition,
        'created_at': term.created_at.isoformat(),
        'updated_at': term.updated_at.isoformat(),
        'views': term.views,
        'likes': term.likes.count(),
        'estimated_read_time': term.estimated_read_time,
    }

    # Serialize recommendations to a list of dictionaries
    recommendations_data = [
        {
            'id': recommended_term.id,
            'title': recommended_term.title,
            'slug': recommended_term.slug,
        }
        for recommended_term in recommendations
    ]

    # Return the glossary term data and recommendations as a JSON response
    return JsonResponse({
        'term': term_data,
        'recommendations': recommendations_data
    })


@api_view(['GET'])
def latest_glossary_terms(request):
    """
    Endpoint to retrieve the latest glossary terms, ordered by created_at (most recent first).
    """
    try:
        # Fetch the latest glossary terms (for example, limit to 10 latest terms)
        latest_terms = GlossaryTerm.objects.all().order_by('-created_at')[:10]

        # Serialize the queryset to return as JSON
        serializer = GlossaryTermSerializer(latest_terms, many=True)

        # Return the serialized data as a Response object
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        # In case of any error, return a proper response with a 500 status code
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)