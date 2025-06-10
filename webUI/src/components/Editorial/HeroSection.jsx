import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-6 md:px-16 relative overflow-hidden mt-23">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Your ultimate guide to{" "}
            <span className="text-[var(--accent-color)]">everything</span>{" "}
            <span className="text-[var(--accent-hover)]">automotive</span>
          </h1>
          <p className="text-[var(--muted-text)] mb-6 max-w-xl">
            Discover the latest car reviews, in-depth articles, automotive news,
            and must-know glossary terms—all in one place.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-[var(--surface-color)] rounded-2xl p-3 shadow-lg max-w-md">
            <Search className="text-[var(--muted-text)] mr-3" />
            <input
              type="text"
              placeholder="Search articles, reviews, or terms..."
              className="bg-transparent focus:outline-none w-full text-[var(--text-color)] placeholder-[var(--muted-text)]"
            />
          </div>
        </motion.div>

        {/* Right Featured Post */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/blog.jpg"
              alt="Featured car"
              className="object-cover w-full h-80 md:h-full transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
              <p className="text-sm text-gray-400">Featured Article</p>
              <h3 className="text-xl font-semibold text-white leading-snug">
                2025 Electric Beasts: Top 5 EVs That Are Redefining the Road
              </h3>
              <button className="mt-4 px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] transition rounded-full text-sm font-medium w-max text-white">
                Read Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-[-5rem] right-[-5rem] w-[300px] h-[300px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-30 z-0" />
      <div className="absolute bottom-[-4rem] left-[-4rem] w-[200px] h-[200px] bg-[var(--accent-hover)] rounded-full blur-2xl opacity-30 z-0" />
    </section>
  );
}