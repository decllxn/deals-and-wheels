import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Fallback image
const defaultImage = "https://via.placeholder.com/400x300?text=News";

// Format readable date
const formatDate = (isoDate) => {
  if (!isoDate) return "Date unavailable";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

export default function EditorialNewsSection() {
  const [latestNews, setLatestNews] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/news-articles/latest-post/");
        // Ensure data is always an array
        setLatestNews(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/news-articles/categories/");
        setNewsCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchLatestNews();
    fetchCategories();
  }, []);

  return (
    <section
      className="px-6 md:px-16 py-20 space-y-16"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Latest Automotive News */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Automotive News</h2>
          <Link
            to="/news"
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--accent-color)" }}
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoadingNews ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--surface-color)" }}
              />
            ))
          ) : latestNews.length > 0 ? (
            latestNews.map((news, idx) => (
              <motion.div
                key={news.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
                style={{ backgroundColor: "var(--surface-color)" }}
              >
                <img
                  src={news.image || defaultImage}
                  alt={news.title || "News Article"}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                    {formatDate(news.published_at)}
                  </p>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {news.title || "Untitled Article"}
                  </h3>
                  <p
                    className="text-sm flex-grow line-clamp-2"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {news.excerpt
                      ? news.excerpt.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
                      : "Stay informed with the latest automotive insights."}
                  </p>
                  <Link
                    to={`/news/${news.slug || news.id}`}
                    className="flex items-center gap-1 text-sm"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div
              className="flex flex-col items-center justify-center p-8 rounded-lg bg-opacity-70"
              style={{ backgroundColor: "var(--surface-color)" }}
            >
              <Newspaper className="w-12 h-12 mb-4" style={{ color: "var(--text-color)" }} />
              <p className="text-lg font-medium">No news articles found.</p>
              <p className="text-sm mt-2">Check back for the latest updates!</p>
            </div>
          )}
        </div>
      </div>

      {/* Browse by Category */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoadingCategories ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl animate-pulse"
                style={{ backgroundColor: "var(--surface-color)" }}
              />
            ))
          ) : newsCategories.length > 0 ? (
            newsCategories.map((cat, idx) => (
              <motion.div
                key={cat.slug || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                className="relative h-28 rounded-xl overflow-hidden group shadow-md cursor-pointer"
              >
                <Link to={`/news/categories/${cat.slug || ""}`}>
                  <img
                    src={cat.image || defaultImage}
                    alt={cat.name || "Category"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h4 className="text-white text-base font-semibold text-center px-2">
                      {cat.name || "Unnamed"}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-opacity-70"
              style={{ backgroundColor: "var(--surface-color)" }}
            >
              <svg
                className="w-10 h-10 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--text-color)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <p className="text-md font-medium">No categories found.</p>
              <p className="text-sm mt-2">We're working on it!</p>
            </div>
          )}
        </div>
      </div>

      <hr className="mt-16 border-t border-[color:var(--border-color)]" />
    </section>
  );
}