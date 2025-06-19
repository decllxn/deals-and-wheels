import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function HeroWithSearch({
  title = "Find the Best Cars",
  subtitle = "",
  onSearch,
}) {
  const [query, setQuery] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] py-16 px-6 md:px-16 relative overflow-hidden mt-13">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 relative z-10">

        {/* Left Text & Search */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {title.split(" ").slice(0, -1).join(" ")} {" "}
            <span className="text-[var(--accent-color)]">{title.split(" ").slice(-1)[0]}</span>
          </h1>

          {/* 3D Image shown between title and subtitle on small screens */}
          {!isLargeScreen && (
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full flex justify-center mb-6"
            >
              <img
                src="/reviews.png"
                alt="Trusted Reviews"
                className="w-full max-w-[260px] sm:max-w-[280px] md:max-w-[320px] h-auto object-contain"
              />
            </motion.div>
          )}

          {subtitle && (
            <p className="text-[var(--muted-text)] mb-6 text-base md:text-lg">
              {subtitle}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[var(--surface-color)] rounded-2xl p-3 shadow-lg max-w-md w-full"
          >
            <Search className="text-[var(--muted-text)] mr-3" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-[var(--text-color)] placeholder-[var(--muted-text)]"
            />
          </form>
        </motion.div>

        {/* Right 3D Image for large screens */}
        {isLargeScreen && (
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex justify-end"
          >
            <img
              src="/reviews.png"
              alt="Trusted Reviews"
              className="w-full max-w-[400px] h-auto object-contain"
            />
          </motion.div>
        )}
      </div>

      {/* Accent Blur */}
      <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
    </section>
  );
}