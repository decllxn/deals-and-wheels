from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from .models import GlossaryTerm

def get_content_based_recommendations(term_id, num_recommendations=5):
    """
    Returns a list of the most similar glossary terms using TF-IDF and cosine similarity,
    without using NumPy directly.
    """
    # Retrieve all glossary terms
    glossary_terms = list(GlossaryTerm.objects.all())

    if not glossary_terms:
        return []

    try:
        target_term = next(term for term in glossary_terms if term.id == term_id)
    except StopIteration:
        return []

    # Combine title and definition for each glossary entry
    documents = [f"{term.title} {term.definition}" for term in glossary_terms]

    # Initialize TF-IDF Vectorizer
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(documents)

    # Use linear_kernel from scikit-learn (faster + no NumPy dependency in your code)
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Get index of the target term
    target_index = glossary_terms.index(target_term)

    # Pair each similarity score with its index
    similarity_scores = list(enumerate(cosine_similarities[target_index]))

    # Sort scores in descending order, exclude self-match
    sorted_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    top_indices = [i for i, score in sorted_scores if i != target_index][:num_recommendations]

    # Return the top matching glossary terms
    return [glossary_terms[i] for i in top_indices]
