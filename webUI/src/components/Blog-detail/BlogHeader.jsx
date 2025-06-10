import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Eye, Heart, Share2 } from "lucide-react"; // Renamed Share2 to ShareIcon for clarity
import { Link } from "react-router-dom"; // Import Link for routing

// Helper functions
const formatDate = (isoDate) => {
  if (!isoDate) return "Date unavailable";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  return path.startsWith("/") ? `http://127.0.0.1:8000${path}` : path;
};

const BlogHeader = ({ blog }) => {
  // Destructure all necessary props, including the stats
  const { id, title, image, category, author, published_at, read_time, tags, views, likes, shares, slug } = blog;

  // Social sharing functions
  const currentBlogUrl = window.location.href;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentBlogUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentBlogUrl)}&text=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentBlogUrl)}&title=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentBlogUrl).then(() => {
      // Use a more subtle feedback mechanism than alert, e.g., a toast notification
      console.log("Link copied to clipboard!");
      // In a real app, you'd show a temporary message to the user
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <section
      className="py-12 px-6 md:px-16 mt-20 relative overflow-hidden" // Consistent section styling
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Background Accents (subtle blur circles for depth) */}
      <div
        className="absolute top-[-5rem] right-[-5rem] w-[300px] h-[300px] rounded-full blur-3xl opacity-15 z-0"
        style={{ backgroundColor: "var(--accent-color)" }}
      />
      <div
        className="absolute bottom-[-4rem] left-[-4rem] w-[200px] h-[200px] rounded-full blur-2xl opacity-10 z-0"
        style={{ backgroundColor: "var(--highlight-color)" }}
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Column: Blog Image */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-80 md:h-[400px]" // Controlled image size
        >
          <img
            src={getImageUrl(image)}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay on image for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Right Column: Blog Info */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center" // Align content vertically
        >
          {/* Category */}
          {category && (
            <Link to={`/editorial/blogs/category/${category.slug}`}>
              <span
                className="inline-block mb-4 text-sm font-medium px-4 py-2 rounded-full transition hover:opacity-80"
                style={{ backgroundColor: "var(--accent-color)", color: "#fff" }}
              >
                {category.name}
              </span>
            </Link>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--text-color)" }}>
            {title}
          </h1>

          {/* Author + Meta + Stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-6" style={{ color: "var(--muted-text)" }}>
            {/* Author */}
            {author && (
              <div className="flex items-center gap-3">
                <img
                  src={author.avatar ? getImageUrl(author.avatar) : "/placeholder.jpg"}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700" // Subtle border
                />
                <span>{author.name}</span>
              </div>
            )}

            {/* Date */}
            <span className="flex items-center gap-1">
              <span className="hidden md:inline">•</span> {/* Consistent divider */}
              {formatDate(published_at)}
            </span>

            {/* Read Time */}
            {read_time && ( // Use read_time from prop
              <span className="flex items-center gap-1">
                <span className="hidden md:inline">•</span>
                {read_time} min read
              </span>
            )}

            {/* Blog Stats (Views, Likes, Shares) */}
            <span className="flex items-center gap-1">
              <span className="hidden md:inline">•</span>
              <Eye size={16} className="mr-1" /> {views ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={16} className="mr-1" /> {likes ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Share2 size={16} className="mr-1" /> {shares ?? 0}
            </span>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {tags.map((tag) => (
                <Link key={tag.slug} to={`/editorial/blogs/hashtags/${tag.slug}`}>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium transition hover:opacity-80"
                    style={{
                      backgroundColor: "var(--highlight-color)", // Use highlight color
                      color: "var(--text-color)",
                    }}
                  >
                    #{tag.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Subtle Social Media Share Buttons - Placed next to content */}
          <div className="flex gap-3 mt-8 pt-4 border-t border-[color:var(--border-color)]">
            <button
              onClick={shareOnFacebook}
              className="p-2 rounded-full transition hover:scale-105"
              style={{ backgroundColor: "var(--surface-color)", color: "var(--muted-text)", border: "1px solid var(--border-color)" }}
            >
              <Facebook size={18} />
            </button>
            <button
              onClick={shareOnTwitter}
              className="p-2 rounded-full transition hover:scale-105"
              style={{ backgroundColor: "var(--surface-color)", color: "var(--muted-text)", border: "1px solid var(--border-color)" }}
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="p-2 rounded-full transition hover:scale-105"
              style={{ backgroundColor: "var(--surface-color)", color: "var(--muted-text)", border: "1px solid var(--border-color)" }}
            >
              <Linkedin size={18} />
            </button>
            <button
              onClick={copyLink}
              className="p-2 rounded-full transition hover:scale-105"
              style={{ backgroundColor: "var(--surface-color)", color: "var(--muted-text)", border: "1px solid var(--border-color)" }}
            >
              <LinkIcon size={18} /> {/* Using LinkIcon for copy link */}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <hr className="mt-12 border-t border-[color:var(--border-color)] opacity-40" />
    </section>
  );
};

export default BlogHeader;