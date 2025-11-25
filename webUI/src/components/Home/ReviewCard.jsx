import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const defaultImage = "https://via.placeholder.com/400x300?text=Car+Review";

export default function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      className="
        bg-white/70 dark:bg-neutral-900/60
        backdrop-blur-md
        border border-[var(--border-color)]
        rounded-2xl overflow-hidden shadow-md hover:shadow-lg
        flex flex-col transition-all
      "
    >
      {/* Thumbnail */}
      <img
        src={review.car?.image || defaultImage}
        alt={review.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <p className="text-sm text-[var(--muted-text)]">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
        <h3 className="text-lg font-semibold line-clamp-2">{review.title}</h3>
        <p className="text-sm text-[var(--muted-text)] line-clamp-3 flex-grow">
          {review.summary || "No summary available."}
        </p>

        {/* Rating + Link */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
            <Star size={16} className="fill-yellow-400" />
            <span>{review.overall_rating?.toFixed(1) || "N/A"} / 10</span>
          </div>
          <Link
            to={`editorial/reviews/${review.slug}`}
            className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] text-sm font-medium"
          >
            Full Review
          </Link>
        </div>
      </div>
    </motion.div>
  );
}