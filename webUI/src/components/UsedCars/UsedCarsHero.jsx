import React from 'react';
import { motion } from 'framer-motion';

const UsedCarsHero = () => {
  return (
    <section className="w-full px-6 md:px-16 relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)] mt-25 pt-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-y-10 lg:gap-x-16 relative z-10">

        {/* Left Content Area - The main text block */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 min-w-[280px] max-w-full lg:max-w-[55%] text-left"
        >
          {/* Tagline */}
          <p className="text-[var(--muted-text)] text-xs md:text-sm uppercase tracking-wide mb-2">
            Drive the extraordinary
          </p>

          {/* Headline + Image for small screens (side-by-side) */}
          <div className="flex items-start lg:block mb-4 space-x-4 lg:space-x-0">
            {/* Headline */}
            <h1 className="flex-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Kenya’s Trusted Auto Marketplace
            </h1>

            {/* Image for small screens - beside headline */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-5/12 max-w-[160px] sm:max-w-[220px] lg:hidden"
            >
              <img
                src="/hero-car.png"
                alt="Used Car Hero"
                className="w-full object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Main Description */}
          <p className="text-base md:text-lg text-[var(--muted-text)] leading-relaxed [text-wrap:balance] mb-8">
            Handpicked cars. Unmatched deals. 100% verified listings — exclusively at <span className="font-bold text-[var(--text-color)]">Deals<span className="text-[var(--accent-color)]">&</span>Wheels</span>
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-3 clear-both">
            <button className="px-5 py-2.5 rounded-lg font-semibold bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
              Find My Car
            </button>
            <button className="px-5 py-2.5 rounded-lg font-semibold border border-[var(--border-color)] text-[var(--text-color)] bg-[var(--surface-color)] hover:bg-[var(--surface-color-hover, #e6e6e6)] transition">
              Browse Inventory
            </button>
          </div>
        </motion.div>

        {/* Image for large screens - right side, now top-aligned */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex justify-center flex-1 max-w-[45%] items-start"
        >
          <img
            src="/hero-car.png"
            alt="Used Car Hero"
            className="w-full object-contain max-h-[400px] lg:max-h-[450px] drop-shadow-xl"
          />
        </motion.div>
      </div>

      {/* Background accent */}
      <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
      
    </section>
  );
};

export default UsedCarsHero;