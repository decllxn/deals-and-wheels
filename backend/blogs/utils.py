from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import Blog


def get_blog_recommendations(blog_id, top_n=3):
    # Step 1: Get all published blogs
    blogs = list(Blog.objects.filter(is_published=True))

    if not blogs:
        return []

    # Step 2: Create parallel lists
    blog_ids = []
    combined_texts = []

    for blog in blogs:
        blog_ids.append(blog.id)

        # Combine title, category, tags, and content
        title = blog.title or ""
        category = blog.category.name if blog.category else ""
        tags = ", ".join([tag.name for tag in blog.hashtags.all()])
        content = blog.content or ""

        combined_text = f"{title} {category} {tags} {content}"
        combined_texts.append(combined_text)

    # Step 3: Check if target blog_id is in the list
    if blog_id not in blog_ids:
        return []

    # Step 4: Vectorize combined text
    vectorizer = TfidfVectorizer(stop_words="english", max_features=10000)
    tfidf_matrix = vectorizer.fit_transform(combined_texts)

    # Step 5: Compute cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Step 6: Get recommendations based on similarity scores
    idx = blog_ids.index(blog_id)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Step 7: Collect top N excluding self
    similar_indices = [i for i, score in sim_scores if i != idx][:top_n]
    recommended_ids = [blog_ids[i] for i in similar_indices]

    # Step 8: Return Blog queryset
    return Blog.objects.filter(id__in=recommended_ids, is_published=True)