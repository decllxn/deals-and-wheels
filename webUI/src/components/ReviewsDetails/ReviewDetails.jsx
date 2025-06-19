import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewMetadata from "./ReviewMetadata";
import ReviewContent from "./ReviewContent";
import RelatedReviews from "./RelatedReviews";

export default function ReviewDetails() {
  const { slug } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/reviews/api/reviews/${slug}/`)
      .then((res) => setReview(res.data))
      .catch((err) => console.error("Failed to fetch review:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="py-20 text-center text-[var(--text-color)]">Loading review...</section>
    );
  }

  if (!review) {
    return (
      <section className="py-20 text-center text-[var(--text-color)]">Review not found.</section>
    );
  }

  return (
    <main className="bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16 py-20 space-y-20">
      {/* ✅ 1. Top Metadata Section */}
      <ReviewMetadata review={review} />

      {/* ✅ 2. Full Review Content */}
      <ReviewContent content={review.content} />

      {/* ✅ 3. Related Reviews */}
      <RelatedReviews
        manufacturerName={review.manufacturer?.name}
        currentReviewId={review.id}
      />
    </main>
  );
}