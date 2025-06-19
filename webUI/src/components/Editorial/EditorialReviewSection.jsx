import { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import CarBrandGrid from "./CarBrandGrid"; // ✅ Import your separate CarBrandGrid

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

const NoReviews = () => (
  <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-[var(--surface-color)] bg-opacity-70">
    <Star className="w-12 h-12 text-yellow-400 mb-4" />
    <p className="text-lg font-medium">No reviews found at the moment.</p>
    <p className="text-sm text-[var(--muted-text)] mt-2">Check back soon for more expert insights!</p>
  </div>
);

export default function EditorialReviewSection() {
  const [latestReviews, setLatestReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reviews/api/reviews/")
      .then((res) => setLatestReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoadingReviews(false));
  }, []);

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16 py-20 space-y-20">

      {/* ✅ Latest Reviews */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Car Reviews</h2>
          <Link to="/editorial/reviews" className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-2 text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loadingReviews ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-[var(--surface-color)] rounded-2xl animate-pulse" />
            ))
          ) : latestReviews.length > 0 ? (
            latestReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="bg-[var(--surface-color)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={review.car?.image || defaultImage}
                  alt={review.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className="text-sm text-[var(--muted-text)]">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">{review.title}</h3>
                  <p className="text-[var(--muted-text)] text-sm flex-grow line-clamp-2">
                    {review.summary || "No summary available."}
                  </p>
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
            ))
          ) : (
            <NoReviews />
          )}
        </div>
      </div>

      {/* ✅ Brand Grid (Modular) */}
      <CarBrandGrid />
    </section>
  );
}