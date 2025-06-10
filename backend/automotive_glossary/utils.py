from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import GlossaryTerm
import numpy as np

def get_content_based_recommendations(term_id, num_recommendations=5):
    """
    Get recommendations based on content similarity using TF-IDF and Cosine Similarity.
    """
    # Get all glossary terms (make sure to exclude the target term itself)
    glossary_terms = GlossaryTerm.objects.all()

    # Retrieve the target glossary term by ID
    target_term = GlossaryTerm.objects.get(id=term_id)
    
    # Create a list of all glossary term definitions and titles
    documents = [term.title + ' ' + term.definition for term in glossary_terms]

    # Initialize TF-IDF Vectorizer
    tfidf = TfidfVectorizer(stop_words='english')

    # Fit and transform the documents (titles and definitions)
    tfidf_matrix = tfidf.fit_transform(documents)

    # Compute cosine similarity between the target term and all other terms
    target_index = glossary_terms.index(target_term)
    cosine_sim = cosine_similarity(tfidf_matrix[target_index], tfidf_matrix).flatten()

    # Get the indices of the most similar glossary terms
    similar_indices = cosine_sim.argsort()[:-num_recommendations-1:-1]

    # Return the most similar glossary terms
    recommendations = [glossary_terms[i] for i in similar_indices if i != target_index]
    return recommendations