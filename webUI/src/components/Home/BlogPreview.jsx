import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Utilities
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

export default function BlogPreview() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/blogs/api/latest/?count=3"
        );
        setLatestBlogs(data.results || data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section
      className="px-6 md:px-16 py-20"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Latest from Our Blog</h2>
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--accent-color)" }}
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {isLoadingBlogs ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl animate-pulse"
              style={{ backgroundColor: "var(--surface-color)" }}
            />
          ))
        ) : latestBlogs.length > 0 ? (
          latestBlogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
              style={{ backgroundColor: "var(--surface-color)" }}
            >
              {/* Image */}
              <img
                src={blog.image || defaultImage}
                alt={blog.title || "Blog Post"}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-grow space-y-3">
                <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                  {formatDate(blog.published_at || blog.created_at)}
                </p>
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p
                  className="text-sm flex-grow line-clamp-2"
                  style={{ color: "var(--muted-text)" }}
                >
                  {stripHtml(blog.excerpt || blog.content).slice(0, 100) + "..."}
                </p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="flex items-center gap-1 text-sm font-medium mt-auto"
                  style={{ color: "var(--accent-color)" }}
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div
            className="flex flex-col items-center justify-center p-8 rounded-lg bg-opacity-70 col-span-3"
            style={{ backgroundColor: "var(--surface-color)" }}
          >
            <BookOpen className="w-12 h-12 mb-4" style={{ color: "var(--text-color)" }} />
            <p className="text-lg font-medium">No blog posts found.</p>
            <p className="text-sm mt-2">Check back for new posts!</p>
          </div>
        )}
      </div>
    </section>
  );
}
