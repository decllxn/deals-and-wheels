import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import HeroWithSearch from "./HeroWithSearch";

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const brand = query.get("brand");

  useEffect(() => {
    const url = brand
      ? `http://127.0.0.1:8000/reviews/api/reviews/?manufacturer__name=${encodeURIComponent(brand)}`
      : `http://127.0.0.1:8000/reviews/api/reviews/`;

    axios
      .get(url)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [brand]);

  return (
    <>
<HeroWithSearch
  title={brand ? `Trusted Reviews for ${brand}` : "Explore Trusted Car Reviews"}
  subtitle="Unbiased, expert-backed opinions from real car enthusiasts."
  onSearch={(searchTerm) => {
    window.location.href = `/reviews?brand=${encodeURIComponent(searchTerm)}`;
  }}
/>
    <section className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16">
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-[var(--surface-color)] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 bg-[var(--surface-color)] rounded-xl">
          <p className="text-lg font-medium">No reviews found.</p>
          <p className="text-sm text-[var(--muted-text)] mt-2">Try another brand or check back later.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
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
                    to={`/editorial/reviews/${review.slug}`}
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
    </section>
    </>
  );
}
