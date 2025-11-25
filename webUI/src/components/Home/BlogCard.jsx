import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const defaultImage = "https://via.placeholder.com/400x300?text=Blog";

// Utility to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

// Format date
const formatDate = (isoDate) => {
  if (!isoDate) return "Date unavailable";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

export default function BlogCard({ blog, index }) {
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
      {/* Image */}
      <img
        src={blog.image || defaultImage}
        alt={blog.title || "Blog Post"}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <p className="text-sm text-[var(--muted-text)]">
          {formatDate(blog.published_at || blog.created_at)}
        </p>
        <h3 className="font-semibold text-lg line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-[var(--muted-text)] line-clamp-3 flex-grow">
          {stripHtml(blog.excerpt || blog.content).slice(0, 100) + "..."}
        </p>

        <Link
          to={`editorial/blogs/${blog.slug}`}
          className="flex items-center gap-1 text-sm font-medium mt-auto text-[var(--accent-color)] hover:text-[var(--accent-hover)]"
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
}