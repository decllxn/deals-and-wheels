import numpy as np
from django.utils.html import strip_tags
from django.utils import timezone
from datetime import timedelta
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .models import NewsItem


def get_news_recommendations(news_id, top_n=5):
    news_queryset = NewsItem.objects.filter(published_at__isnull=False).prefetch_related('hashtags', 'category', 'manufacturer')
    news_list = list(news_queryset)

    # Find index of the target news item
    if not any(news.id == news_id for news in news_list):
        return []

    # Prepare textual data for TF-IDF
    content_list = [
        f"{strip_tags(news.content)} {news.title} "
        f"{news.category.name if news.category else ''} "
        f"{' '.join([tag.name for tag in news.hashtags.all()])} "
        f"{news.manufacturer.name if news.manufacturer else ''}"
        for news in news_list
    ]

    # TF-IDF vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(content_list)

    # Cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Find the index of the requested news item
    idx = next(i for i, news in enumerate(news_list) if news.id == news_id)

    # Sort news items by similarity score
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n + 1]

    # Get recommended news items
    recommended_indices = [i[0] for i in sim_scores]
    return [news_list[i] for i in recommended_indices]


def get_feed_for_user(user=None, limit=20):
    now = timezone.now()
    news_items = NewsItem.objects.filter(published_at__isnull=False).prefetch_related('hashtags', 'manufacturer', 'category')

    def compute_score(item):
        # Time-based freshness factor
        hours_old = max((now - item.published_at).total_seconds() / 3600, 1)
        freshness_score = 1 / hours_old

        # Engagement-based popularity
        popularity_score = (
            item.views * 0.4 +
            item.liked_by.count() * 1.0 +
            item.shared_by.count() * 1.2
        )

        # Personalization boost (if user is logged in and has profile prefs)
        user_score = 0
        if user and user.is_authenticated and hasattr(user, 'profile'):
            profile = user.profile
            if item.category and hasattr(profile, 'preferred_categories') and item.category in profile.preferred_categories.all():
                user_score += 1.5
            if item.manufacturer and hasattr(profile, 'preferred_manufacturers') and item.manufacturer in profile.preferred_manufacturers.all():
                user_score += 1.0

        return freshness_score + popularity_score + user_score

    # Rank all news by score and return top results
    ranked_news = sorted(news_items, key=compute_score, reverse=True)
    return ranked_news[:limit]