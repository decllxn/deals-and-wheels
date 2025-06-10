import math
from datetime import datetime
from django.db.models import F, Q
from .models import Guide

def calculate_relevance_score(guide, user=None):
    """
    A production-grade algorithm to calculate the relevance score of a guide
    based on multiple factors like recency, popularity, content length, difficulty level, and user preferences.
    """

    # Recency Factor: Guides posted recently are more relevant (with decay for older guides)
    recency_score = max(0, (datetime.now() - guide.publish_date).days)  # Days since publication
    recency_weight = 1 / (1 + recency_score)  # Decay function (recent guides get higher score)

    # Popularity Factor: Views, likes, and shares are weighted to give more popular guides a higher rank
    popularity_score = (guide.views * 0.1) + (guide.likes * 0.2) + (guide.shares * 0.2)
    popularity_weight = popularity_score / 1000  # Normalize based on a common scale

    # Content Length: Longer guides tend to be more informative (but not too long)
    word_count = len(guide.content.split())  # Use word count as a proxy for content length
    content_length_score = min(word_count / 1000, 1)  # Normalize to a 0-1 range (max 1000 words)

    # Difficulty Level Matching (if user information is provided)
    difficulty_score = 0
    if user and guide.difficulty_level:
        if guide.difficulty_level == user.expertise_level:
            difficulty_score = 1  # Match = 1
        elif guide.difficulty_level == 'BEGINNER' and user.expertise_level in ['INTERMEDIATE', 'EXPERT']:
            difficulty_score = 0.5  # Slightly lower for mismatched difficulty

    # Hashtags Matching: Guides with trending hashtags should rank higher
    hashtag_score = len(set(guide.hashtags.all()) & set(user.preferred_hashtags)) if user else 0

    # SEO Score (based on keywords and SEO-friendly metadata)
    seo_score = 0
    if guide.seo_title and 'buy' in guide.seo_title.lower():
        seo_score += 0.2  # Basic keyword matching

    # Total Score Calculation: Combine all factors into a final score
    final_score = (
        (recency_weight * 0.3) + 
        (popularity_weight * 0.3) + 
        (content_length_score * 0.2) + 
        (difficulty_score * 0.1) + 
        (hashtag_score * 0.05) +
        (seo_score * 0.05)
    )

    return final_score


def get_ranked_guides():
    """
    Fetches and ranks the guides based on the calculated relevance score.
    """
    guides = Guide.objects.filter(published=True)

    # Calculate and assign relevance score to each guide
    ranked_guides = []
    for guide in guides:
        score = calculate_relevance_score(guide)
        ranked_guides.append((guide, score))

    # Sort guides by score in descending order (highest score first)
    ranked_guides.sort(key=lambda x: x[1], reverse=True)

    # Return the sorted list of guides
    return [guide for guide, score in ranked_guides]