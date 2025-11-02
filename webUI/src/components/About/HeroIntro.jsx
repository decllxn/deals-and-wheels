import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroIntro = () => {
  return (
    <section
      className="relative flex flex-col justify-center items-center text-center px-6 md:px-16 py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Background Wave Illustration */}
      <img
        src="/745.jpg"
        alt="Blue Wave Illustration"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="lazy"
      />

      {/* Overlay Gradient for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)]/90 via-[var(--bg-color)]/70 to-[var(--bg-color)]/100" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          style={{ color: "var(--accent-color)" }}
        >
          Revolutionizing the Car Marketplace
        </motion.h1>

        <p
          className="mt-6 text-lg md:text-xl font-light"
          style={{ color: "var(--muted-text)" }}
        >
          Deals & Wheels is redefining how Kenya buys, sells, and experiences cars — 
          through technology, verified dealers, and transparent transactions.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/marketplace"
            className="px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md transition-all duration-300"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "#fff",
            }}
          >
            Explore Cars <ArrowRight size={18} />
          </Link>

          <Link
            to="/about"
            className="px-6 py-3 rounded-full font-semibold border transition-all duration-300"
            style={{
              borderColor: "var(--accent-color)",
              color: "var(--accent-color)",
            }}
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Floating Tech Circles (Subtle Motion) */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent-color)" }}
        animate={{ y: [0, 15, 0], opacity: [0.8, 0.5, 0.8] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-28 h-28 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--highlight-color)" }}
        animate={{ y: [0, -20, 0], opacity: [0.7, 0.4, 0.7] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
    </section>
  );
};

export default HeroIntro;