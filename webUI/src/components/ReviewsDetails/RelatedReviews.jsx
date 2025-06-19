import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

export default function RelatedReviews({ manufacturerName, currentReviewId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!manufacturerName) return;

    axios
      .get(`http://127.0.0.1:8000/reviews/api/reviews/?manufacturer__name=${encodeURIComponent(manufacturerName)}`)
      .then((res) => {
        const filtered = res.data.filter((r) => r.id !== currentReviewId);
        setRelated(filtered.slice(0, 6)); // Limit to 6 related reviews
      })
      .catch((err) => console.error("Error fetching related reviews:", err))
      .finally(() => setLoading(false));
  }, [manufacturerName, currentReviewId]);

  if (loading || related.length === 0) return null;

  return (
    <section className="mt-20 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">More Reviews from {manufacturerName}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[var(--surface-color)] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
          >
            <img
              src={review.car?.image || defaultImage}
              alt={review.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow space-y-2">
              <p className="text-sm text-[var(--muted-text)]">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                {review.title}
              </h3>
              <p className="text-sm text-[var(--muted-text)] line-clamp-2">
                {review.summary || "No summary available."}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                  <Star size={16} className="fill-yellow-400" />
                  <span>{review.overall_rating?.toFixed(1) || "N/A"} / 10</span>
                </div>
                <Link
                  to={`/reviews/${review.slug}`}
                  className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}