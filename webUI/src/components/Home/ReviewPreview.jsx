// 📌 ReviewPreview.jsx
import { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

export default function ReviewPreview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/reviews/api/latest-reviews/");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load reviews at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Section Heading */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Deals<span className="text-red-600">&</span>Wheels Reviews
          </h2>
          <Link
            to="/reviews"
            className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-2 text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* ⏳ Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-[var(--surface-color)] rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ❌ Error State */}
        {error && !loading && (
          <p className="text-center font-medium text-red-500">{error}</p>
        )}

        {/* 🚫 No Reviews */}
        {!loading && !error && reviews.length === 0 && (
          <p className="text-center text-[var(--muted-text)]">
            🚘 No reviews available yet.
          </p>
        )}

        {/* ✅ Reviews Grid */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="bg-[var(--surface-color)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
              >
                {/* Thumbnail */}
                <img
                  src={review.car?.image || defaultImage}
                  alt={review.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className="text-sm text-[var(--muted-text)]">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {review.title}
                  </h3>
                  <p className="text-[var(--muted-text)] text-sm flex-grow line-clamp-2">
                    {review.summary || "No summary available."}
                  </p>

                  {/* Score & Link */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                      <Star size={16} className="fill-yellow-400" />
                      <span>{review.overall_rating?.toFixed(1) || "N/A"} / 10</span>
                    </div>
                    <Link
                      to={`/reviews/${review.slug}`}
                      className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] text-sm"
                    >
                      Full Review
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}