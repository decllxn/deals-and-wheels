import React from 'react';
import { motion } from 'framer-motion';

const UsedCarsHero = () => {
  return (
    <section className="w-full px-6 md:px-16 relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)] mt-10 md:mt-20 sm:mt-25">

      <div className="max-w-7xl mx-auto flex flex-row flex-wrap justify-between items-center gap-10 relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 min-w-[280px] space-y-4"
        >
          {/* Tagline */}
          <p className="text-[var(--muted-text)] text-xs md:text-sm uppercase tracking-wide">
            Drive the extraordinary
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Kenya’s Trusted Auto Marketplace
          </h1>

          <p className="text-base md:text-lg text-[var(--muted-text)]">
            Handpicked cars. Unmatched deals. 100% verified listings — exclusively at <span className="font-bold text-[var(--text-color)]">Deals<span className="text-[var(--accent-color)]">&</span>Wheels</span>
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            <button className="px-5 py-2.5 rounded-lg font-semibold bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
              Find My Car
            </button>
            <button className="px-5 py-2.5 rounded-lg font-semibold border border-[var(--border-color)] text-[var(--text-color)] bg-[var(--surface-color)] hover:bg-[var(--surface-color-hover, #e6e6e6)] transition">
              Browse Inventory
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center flex-1 min-w-[220px]"
        >
          <img
            src="/hero-car.png"
            alt="Used Car Hero"
            className="max-w-[220px] md:max-w-sm lg:max-w-md object-contain"
          />
        </motion.div>
      </div>

      {/* Background accent for extra polish */}
      <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
    </section>
  );
};

export default UsedCarsHero;