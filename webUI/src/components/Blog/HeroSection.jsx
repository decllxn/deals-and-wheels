import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [latestBlog, setLatestBlog] = useState(null);

  const handleSearch = () => {
    if (searchQuery) {
      console.log("Search:", searchQuery);
      // TODO: Implement navigation or API search call
    }
  };

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/blogs/api/latest/");
        if (Array.isArray(data) && data.length > 0) {
          setLatestBlog(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch latest blog:", err);
      }
    };

    fetchLatestBlog();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    return path.startsWith("/") ? `http://127.0.0.1:8000${path}` : path;
  };

  return (
    <section
      className="py-20 px-6 md:px-16 relative overflow-hidden mt-20"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Fresh takes on{" "}
            <span style={{ color: "var(--accent-color)" }}>cars</span> and{" "}
            <span style={{ color: "var(--highlight-color)" }}>automotive culture</span>
          </h1>
          <p className="mb-6 max-w-xl" style={{ color: "var(--muted-text)" }}>
            Dive into editorial articles, opinion pieces, and insights from industry enthusiasts. Stay informed, inspired, and in gear.
          </p>

          {/* Search Bar */}
          <div
            className="flex items-center rounded-2xl p-3 shadow-lg max-w-md"
            style={{ backgroundColor: "var(--surface-color)" }}
          >
            <Search className="mr-3" style={{ color: "var(--muted-text)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search blog posts, categories, or hashtags..."
              className="bg-transparent focus:outline-none w-full text-sm"
              style={{ color: "var(--text-color)" }}
            />
          </div>
        </motion.div>

        {/* Right Column - Featured Blog */}
        {latestBlog && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getImageUrl(latestBlog.image)}
                alt={latestBlog.title}
                className="object-cover w-full h-80 md:h-full transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <p className="text-sm text-gray-400">
                  {formatDate(latestBlog.published_at || latestBlog.created_at)}
                </p>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {latestBlog.title}
                </h3>
                <Link
                  to={`/editorial/blogs/${latestBlog.slug}`}
                  className="mt-4 px-4 py-2 rounded-full text-sm font-medium w-max transition"
                  style={{ backgroundColor: "var(--accent-color)", color: "#fff" }}
                >
                  Read Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Background Accents */}
      <div
        className="absolute top-[-5rem] right-[-5rem] w-[300px] h-[300px] rounded-full blur-3xl opacity-30 z-0"
        style={{ backgroundColor: "var(--accent-color)" }}
      />
      <div
        className="absolute bottom-[-4rem] left-[-4rem] w-[200px] h-[200px] rounded-full blur-2xl opacity-30 z-0"
        style={{ backgroundColor: "var(--highlight-color)" }}
      />

      {/* Divider */}
      <hr className="mt-20 border-t border-[color:var(--border-color)] opacity-40" />
    </section>
  );
}