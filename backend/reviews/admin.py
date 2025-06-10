from django.contrib import admin
from .models import (
    Car,
    Review,
    ReviewSection,
    Rating,
    ReviewComment,
    UserReviewFeedback
)


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('manufacturer', 'model_name', 'year', 'slug')
    search_fields = ('model_name', 'manufacturer__name')
    list_filter = ('manufacturer', 'year')
    autocomplete_fields = ['manufacturer']
    readonly_fields = ('slug',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('car', 'manufacturer', 'author', 'title', 'created_at', 'published_at', 'overall_rating')
    search_fields = ('car__model_name', 'author__username', 'title')
    list_filter = ('published_at', 'manufacturer', 'car')
    autocomplete_fields = ['car', 'manufacturer', 'author']


@admin.register(ReviewSection)
class ReviewSectionAdmin(admin.ModelAdmin):
    list_display = ('review', 'section_type', 'rating')
    search_fields = ('review__car__model_name', 'section_type')
    list_filter = ('section_type', 'rating')
    autocomplete_fields = ['review']


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('review_section', 'user', 'score')
    list_filter = ('review_section__section_type', 'score')
    autocomplete_fields = ['review_section', 'user']


@admin.register(ReviewComment)
class ReviewCommentAdmin(admin.ModelAdmin):
    list_display = ('review', 'author', 'created_at')
    search_fields = ('content', 'author__username')
    autocomplete_fields = ['review', 'author']


@admin.register(UserReviewFeedback)
class UserReviewFeedbackAdmin(admin.ModelAdmin):
    list_display = ('review', 'user', 'section', 'rating')
    list_filter = ('section', 'rating')
    search_fields = ('user__username', 'feedback')
    autocomplete_fields = ['review', 'user']