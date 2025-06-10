import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import Blog


def get_blog_recommendations(blog_id, top_n=3):
    # Step 1: Get all blogs
    blogs = Blog.objects.filter(is_published=True)

    if not blogs.exists():
        return []

    # Step 2: Prepare structured data
    data = []
    for blog in blogs:
        data.append({
            "id": blog.id,
            "title": blog.title or "",
            "category": blog.category.name if blog.category else "",
            "tags": ", ".join([tag.name for tag in blog.hashtags.all()]),
            "content": blog.content or "",
        })

    df = pd.DataFrame(data)

    # Step 3: Check for required data
    if df.empty or "title" not in df.columns:
        return []

    # Step 4: Combine fields into one string per blog
    df["combined"] = df["title"] + " " + df["category"] + " " + df["tags"] + " " + df["content"]

    # Step 5: Vectorize combined text
    vectorizer = TfidfVectorizer(stop_words="english", max_features=10000)
    tfidf_matrix = vectorizer.fit_transform(df["combined"])

    # Step 6: Compute similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Step 7: Locate index of blog_id
    if blog_id not in df["id"].values:
        return []

    idx = df.index[df["id"] == blog_id][0]

    # Step 8: Get top N similar blogs (excluding the current one)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n + 1]  # Skip self (first item)
    blog_indices = [i[0] for i in sim_scores]

    # Step 9: Return matching Blog objects
    recommended_ids = df.iloc[blog_indices]["id"].tolist()
    return Blog.objects.filter(id__in=recommended_ids, is_published=True)
