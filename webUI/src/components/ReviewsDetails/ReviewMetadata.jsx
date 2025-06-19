import { motion } from "framer-motion";
import { Star } from "lucide-react";

const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  return path.startsWith("/") ? `http://127.0.0.1:8000${path}` : path;
};

export default function ReviewMetadata({ review }) {
  if (!review) return null;

  const {
    title,
    summary,
    overall_rating,
    author,
    car,
    feature_image,
    created_at,
  } = review;

  const authorName = author
    ? author.first_name || author.last_name
      ? `${author.first_name || ""} ${author.last_name || ""}`.trim()
      : author.username
    : null;

  return (
    <section
      className="mt-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Feature Image */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden w-full h-72 md:h-[400px]"
        >
          <img
            src={getImageUrl(feature_image || car?.image)}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Review Info */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          {/* Car Details */}
          <div className="mb-3 text-sm text-[var(--muted-text)]">
            {car?.manufacturer?.name} • {car?.model_name} • {car?.year}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>

          {/* Rating & Author */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-6 text-[var(--muted-text)]">
            <div className="flex items-center gap-2 text-yellow-400 font-semibold text-base">
              <Star size={18} className="fill-yellow-400" />
              {overall_rating?.toFixed(1) || "N/A"} / 10
            </div>

            {authorName && (
              <span className="flex items-center gap-1">
                <span className="hidden md:inline">•</span>
                Written by {authorName}
              </span>
            )}

            {created_at && (
              <span className="flex items-center gap-1">
                <span className="hidden md:inline">•</span>
                {new Date(created_at).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Summary */}
          {summary && (
            <p className="text-sm md:text-base leading-relaxed text-[var(--text-color)]">
              {summary}
            </p>
          )}
        </motion.div>
      </div>

      <hr className="mt-12 border-t border-[color:var(--border-color)] opacity-30" />
    </section>
  );
}