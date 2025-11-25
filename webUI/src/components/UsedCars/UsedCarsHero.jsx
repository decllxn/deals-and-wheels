import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UsedCarsHero = () => {
  return (
    <section className="w-full px-6 md:px-16 relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)] pt-24 pb-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-y-10 lg:gap-x-16 relative z-10">

        {/* Left Content Area */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 min-w-[280px] max-w-full lg:max-w-[55%] text-left"
        >
          {/* Tagline */}
          <p className="text-[var(--muted-text)] text-xs md:text-sm uppercase tracking-wide mb-2">
            Drive the Future
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Kenya’s Most Trusted Car Marketplace
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-[var(--muted-text)] leading-relaxed mb-8">
            Handpicked vehicles, verified listings, and unmatched deals — exclusively at{" "}
            <span className="font-bold text-[var(--accent-color)]">Magari.ke</span>
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="px-6 py-3 rounded-xl font-semibold bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition shadow-md hover:shadow-lg"
            >
              Explore Cars
            </Link>

            <Link
              to="/subscribe"
              className="px-6 py-3 rounded-xl font-semibold border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white transition shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex justify-center flex-1 max-w-[45%] items-start"
        >
          <div className="relative w-full">
            <div className="absolute inset-0 rounded-3xl backdrop-blur-lg bg-white/5 z-0" />
            <img
              src="/blue-isolated-car.png"
              alt="Zamara Hero Car"
              className="w-full object-contain max-h-[450px] relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Background accent */}
      <div className="absolute top-[-6rem] right-[-6rem] w-[300px] h-[300px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-15 z-0" />
    </section>
  );
};

export default UsedCarsHero;