import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

// Default fallback image
const defaultImage = "https://via.placeholder.com/400x300?text=Blog";

// Format ISO date string into a readable format
const formatDate = (isoDate) => {
  if (!isoDate) return "Date unavailable";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

// Strip HTML tags from excerpt or content
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

// Resolve full image URLs
const getImageUrl = (path) => {
  if (!path) return defaultImage;
  return path.startsWith("/") ? `http://127.0.0.1:8000${path}` : path;
};

const RecommendedReads = ({ blogId = 1 }) => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/api/recommended/${blogId}/`);
        setRecommendedArticles(response.data);
      } catch (error) {
        console.error("Error fetching recommended blogs:", error);
        setRecommendedArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedArticles();
  }, [blogId]);

  return (
    <section className="py-12 px-6 md:px-16 relative overflow-hidden" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Background Accents */}
      <div className="absolute top-[-5rem] right-[-5rem] w-[300px] h-[300px] rounded-full blur-3xl opacity-15 z-0" style={{ backgroundColor: "var(--accent-color)" }} />
      <div className="absolute bottom-[-4rem] left-[-4rem] w-[200px] h-[200px] rounded-full blur-2xl opacity-10 z-0" style={{ backgroundColor: "var(--highlight-color)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          Recommended Reads
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--surface-color)" }} />
            ))
          ) : recommendedArticles.length > 0 ? (
            recommendedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
                style={{ backgroundColor: "var(--surface-color)" }}
              >
                <Link to={`/editorial/blogs/${article.slug}`} className="block">
                  <img
                    src={getImageUrl(article.image)}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                    {formatDate(article.published_at || article.created_at)}
                  </p>

                  <h3 className="font-semibold text-lg leading-tight line-clamp-2" style={{ color: "var(--text-color)" }}>
                    {article.title}
                  </h3>

                  <p className="text-sm flex-grow line-clamp-2" style={{ color: "var(--muted-text)" }}>
                    {stripHtml(article.excerpt || article.content).slice(0, 100) + "..."}
                  </p>

                  <Link
                    to={`/editorial/blogs/${article.slug}`}
                    className="flex items-center gap-1 text-sm"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 rounded-lg col-span-full" style={{ backgroundColor: "var(--surface-color)" }}>
              <BookOpen className="w-12 h-12 mb-4" style={{ color: "var(--text-color)" }} />
              <p className="text-lg font-medium" style={{ color: "var(--text-color)" }}>No recommended articles found.</p>
              <p className="text-sm mt-2" style={{ color: "var(--muted-text)" }}>Check back later for personalized recommendations.</p>
            </div>
          )}
        </div>
      </div>

      <hr className="mt-12 border-t border-[color:var(--border-color)] opacity-40" />
    </section>
  );
};

export default RecommendedReads;