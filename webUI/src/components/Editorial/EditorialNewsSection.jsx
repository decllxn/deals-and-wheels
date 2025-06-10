import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react"; // Using a relevant icon

const darkBackgroundColor = "#1f1f1f";
const secondaryBackgroundColor = "#2a2a2a";
const lightTextColor = "rgba(255, 255, 255, 0.6)"; // Slightly transparent white

export default function EditorialNewsSection() {
  const [latestNews, setLatestNews] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/news-articles/latest-post/");
        setLatestNews([response.data]);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/news-articles/categories/");
        setNewsCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchLatestPosts();
    fetchCategories();
  }, []);

  const defaultImage = "https://via.placeholder.com/400x300?text=News"; // Fallback image

  const NoNews = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-[#1f1f1f] bg-opacity-70">
      <Newspaper className="w-12 h-12 text-white mb-4" />
      <p className="text-lg text-white font-medium">{message}</p>
      <p className="text-sm text-white mt-2">Stay tuned for updates!</p>
    </div>
  );

  const NoCategories = () => (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#1f1f1f] bg-opacity-70">
      <svg className="w-10 h-10 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <p className="text-md text-white font-medium">No categories found.</p>
      <p className="text-sm text-white mt-2">We're working on it!</p>
    </div>
  );

  return (
    <section className={`bg-[${darkBackgroundColor}] text-white px-6 md:px-16 py-20 space-y-16`}>
      {/* Latest News */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Automotive News</h2>
          <Link
            to="/news"
            className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoadingNews ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
            ))
          ) : latestNews.length > 0 ? (
            latestNews.map((news, idx) => (
              <motion.div
                key={news.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-[${secondaryBackgroundColor}] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col`}
              >
                <img
                  src={news.image || defaultImage}
                  alt={news.title || "News Article"}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className={`text-sm text-[${lightTextColor}]`}>{news.published_at || "Date unavailable"}</p>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {news.title || "Untitled Article"}
                  </h3>
                  <div className="flex-grow" />
                  <Link to={`/news/${news.slug || news.id}`} className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <NoNews message="No latest automotive news available right now." />
          )}
        </div>
      </div>

      {/* News Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoadingCategories ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-800 rounded-xl animate-pulse" />
            ))
          ) : newsCategories.length > 0 ? (
            newsCategories.map((cat, idx) => (
              <motion.div
                key={cat.name || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                className="relative h-28 rounded-xl overflow-hidden group shadow-md cursor-pointer"
              >
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
              </motion.div>
            ))
          ) : (
            <NoCategories />
          )}
        </div>
      </div>
    </section>
  );
}