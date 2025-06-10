import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch categories from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/blogs/api/categories/") // Updated URL to the new endpoint
      .then((response) => {
        // Ensure response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setCategories(response.data); // Set fetched categories data
        } else {
          console.error("API response for categories is not an array:", response.data);
          setCategories([]); // Set to empty array to prevent map error
        }
      })
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setIsLoading(false)); // Set loading to false after fetch completes
  }, []);

  return (
    <section
      className="py-12 px-6 md:px-16 relative overflow-hidden" // Changed to section, adjusted padding, removed mt-10
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }} // Apply theme colors
    >
      {/* Subtle Background Accent 1 */}
      <div
        className="absolute top-[-3rem] right-[-3rem] w-[180px] h-[180px] rounded-full blur-3xl opacity-15 z-0"
        style={{ backgroundColor: "var(--highlight-color)" }}
      />
      {/* Subtle Background Accent 2 */}
      <div
        className="absolute bottom-[-2rem] left-[-2rem] w-[120px] h-[120px] rounded-full blur-2xl opacity-10 z-0"
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
          Categories
        </motion.h2>

        {/* Categories Grid (Responsive) */}
        <div className="flex flex-wrap gap-3"> {/* Changed to flex wrap for pill layout */}
          {isLoading ? (
            // Skeleton loader for categories
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 rounded-full animate-pulse" // Pill shape and pulse animation
                style={{ backgroundColor: "var(--surface-color)" }}
              />
            ))
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 10 }} // Adjusted y for a subtle upward motion
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Consistent delay
              >
                <Link
                  to={`/editorial/blogs/category/${category.slug}`}
                  className="px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 text-center inline-block" // Pill shape, font, and inline-block for Link styling
                  style={{
                    backgroundColor: "var(--accent-color)", // Accent color background
                    color: "#fff", // White text
                    whiteSpace: "nowrap", // Prevent text wrapping in small buttons
                  }}
                >
                  {category.name}
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center w-full col-span-full" style={{ color: "var(--muted-text)" }}>
              No categories found at the moment.
            </p>
          )}
        </div>
      </div>
      {/* Divider */}
      <hr className="mt-12 border-t border-[color:var(--border-color)] opacity-40" />
    </section>
  );
};

export default Categories;