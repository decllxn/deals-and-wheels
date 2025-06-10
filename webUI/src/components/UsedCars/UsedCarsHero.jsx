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
          // Set flex-1 and max-w for proper content width on larger screens
          className="flex-1 min-w-[280px] max-w-full lg:max-w-[55%] text-left"
        >
          {/* Tagline */}
          <p className="text-[var(--muted-text)] text-xs md:text-sm uppercase tracking-wide mb-2">
            Drive the extraordinary
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Kenya’s Trusted Auto Marketplace
          </h1>

          {/* Image for smaller screens, floated right for text wrap */}
          {/* Increased horizontal margin (ml-6) for better text separation */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="float-right ml-6 mb-4 w-6/12 max-w-[220px] sm:w-5/12 sm:max-w-[280px] md:max-w-[320px] lg:hidden clear-right"
          >
            <img
              src="/hero-car.png"
              alt="Used Car Hero"
              className="w-full object-contain max-h-[160px] sm:max-h-[220px] drop-shadow-xl"
            />
          </motion.div>

          {/* Main Description - text will wrap around the floated image */}
          {/* Ensure sufficient bottom margin for separation from buttons */}
          <p className="text-base md:text-lg text-[var(--muted-text)] leading-relaxed [text-wrap:balance] mb-8">
            Handpicked cars. Unmatched deals. 100% verified listings — exclusively at <span className="font-bold text-[var(--text-color)]">Deals<span className="text-[var(--accent-color)]">&</span>Wheels</span>
          </p>

          {/* Call-to-action buttons - still uses clear-both to stay below the floated image */}
          <div className="flex flex-wrap gap-3 clear-both">
            <button className="px-5 py-2.5 rounded-lg font-semibold bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
              Find My Car
            </button>
            <button className="px-5 py-2.5 rounded-lg font-semibold border border-[var(--border-color)] text-[var(--text-color)] bg-[var(--surface-color)] hover:bg-[var(--surface-color-hover, #e6e6e6)] transition">
              Browse Inventory
            </button>
          </div>
        </motion.div>

        {/* Image for large screens - full-width, hidden on small screens */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          // Flex-1 and max-w for proper image width on larger screens
          // Removed ml-auto to allow items-center/start to handle spacing
          className="hidden lg:flex justify-center flex-1 max-w-[45%] items-center"
        >
          <img
            src="/hero-car.png"
            alt="Used Car Hero"
            className="w-full object-contain max-h-[400px] lg:max-h-[450px]" // Slightly increased max-height for large screens
          />
        </motion.div>
      </div>

      {/* Background accent for extra polish */}
      <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
    </section>
  );
};

export default UsedCarsHero;