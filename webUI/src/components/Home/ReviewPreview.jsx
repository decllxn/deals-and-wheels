import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import useLatestReviews from "@/hooks/useLatestReviews";

export default function ReviewPreview() {
  const { reviews, loading, error } = useLatestReviews();

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Zamara <span className="text-[var(--accent-color)]">Reviews</span>
          </h2>
          <Link
            to="editorial/reviews"
            className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-2 text-sm font-medium"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white/50 dark:bg-neutral-900/50 rounded-2xl animate-pulse shadow-md"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center font-medium text-red-500">{error}</p>
        )}

        {/* No Reviews */}
        {!loading && !error && reviews.length === 0 && (
          <p className="text-center text-[var(--muted-text)]">
            🚘 No reviews available yet.
          </p>
        )}

        {/* Reviews Grid */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}