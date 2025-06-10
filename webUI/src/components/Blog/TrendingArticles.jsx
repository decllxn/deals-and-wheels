import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaRegEye, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const TrendingArticles = () => {
  const [articles, setArticles] = useState([]);

  // Fetch trending articles from the API
  useEffect(() => {
    axios
      .get("http://localhost:8000/blogs/blogs/trending/")
      .then((response) => {
        // Ensure response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          console.error("API response for trending articles is not an array:", response.data);
          setArticles([]); // Set to empty array to prevent map error
        }
      })
      .catch((error) => console.error("Error fetching trending articles:", error));
  }, []);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg"; // Provide a default placeholder
    return path.startsWith("/") ? `http://127.0.0.1:8000${path}` : path;
  };

  return (
    <section
      className="py-12 px-6 md:px-16 relative overflow-hidden" // Changed to section, adjusted padding, removed mt-12
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }} // Apply theme colors
    >
      {/* Background Accent (to complete the blue shade from HeroSection) */}
      <div
        className="absolute bottom-[-4rem] left-[-4rem] w-[200px] h-[200px] rounded-full blur-2xl opacity-30 z-0"
        style={{ backgroundColor: "var(--highlight-color)" }}
      />
      {/* Subtle Top-Left Accent (similar to HeroSection's top-right) */}
      <div
        className="absolute top-[-2rem] left-[-2rem] w-[150px] h-[150px] rounded-full blur-3xl opacity-20 z-0"
        style={{ backgroundColor: "var(--accent-color)" }}
      />

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8" // Adjusted margin-bottom
        >
          Trending Articles
        </motion.h2>

        {/* Articles Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: article.id * 0.05 }} // Reduced delay for quicker animation
                className="relative border rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl" // Subtle shadow, rounded corners
                style={{
                  backgroundColor: "var(--surface-color)", // Apply surface color
                  borderColor: "var(--border-color)", // Apply border color
                }}
              >
                <Link to={`/editorial/blogs/${article.slug}`} className="block">
                  {/* Article Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Article Info */}
                  <div className="p-5">
                    <h3
                      className="text-lg font-semibold transition duration-300"
                      style={{ color: "var(--text-color)" }} // Apply text color
                    >
                      {/* Dynamic text color on hover using accent-color */}
                      <span
                        className="group-hover:text-[color:var(--accent-color)] transition duration-300"
                      >
                        {article.title}
                      </span>
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center space-x-4 text-sm mt-2" style={{ color: "var(--muted-text)" }}>
                      <div className="flex items-center">
                        <FaRegEye className="mr-1" /> {article.views}
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" /> {article.read_time || "N/A min"} {/* Use read_time from API */}
                      </div>
                    </div>

                    {/* Article Excerpt */}
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted-text)" }}>
                      {article.excerpt}
                    </p>

                    {/* Read More Text (subtle, not a button) */}
                    <span className="mt-4 inline-block font-medium hover:underline" style={{ color: "var(--accent-color)" }}>
                      Read More →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center w-full col-span-full" style={{ color: "var(--muted-text)" }}>
              No trending articles found at the moment.
            </p>
          )}
        </div>
      </div>
       {/* Divider */}
       <hr className="mt-12 border-t border-[color:var(--border-color)] opacity-40" />
    </section>
  );
};

export default TrendingArticles;