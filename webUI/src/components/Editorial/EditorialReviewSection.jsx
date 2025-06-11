import { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { kenyaCarBrands } from "../Reviews/Carbrands";

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

const NoReviews = () => (
  <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-[var(--surface-color)] bg-opacity-70">
    <Star className="w-12 h-12 text-yellow-400 mb-4" />
    <p className="text-lg font-medium">No reviews found at the moment.</p>
    <p className="text-sm text-[var(--muted-text)] mt-2">Check back soon for more expert insights!</p>
  </div>
);

const NoBrands = () => (
  <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[var(--surface-color)] bg-opacity-70">
    <svg className="w-10 h-10 text-[var(--text-color)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
    </svg>
    <p className="text-md font-medium">No car brands found.</p>
    <p className="text-sm text-[var(--muted-text)] mt-2">Brands coming soon!</p>
  </div>
);

export default function EditorialReviewSection() {
  const [latestReviews, setLatestReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reviews/api/reviews/")
      .then((res) => setLatestReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoadingReviews(false));
  }, []);

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-6 md:px-16 py-20 space-y-20">

      {/* Latest Reviews */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Car Reviews</h2>
          <Link to="/reviews" className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-2 text-sm">
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

      {/* Brand Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold">Browse Reviews by Car Brand</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {kenyaCarBrands.length > 0 ? (
            kenyaCarBrands.map((brand, idx) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/reviews?brand=${encodeURIComponent(brand.name)}`)}
                className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center justify-center hover:shadow-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="h-10 object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))
          ) : (
            <NoBrands />
          )}
        </div>
      </div>
    </section>
  );
}