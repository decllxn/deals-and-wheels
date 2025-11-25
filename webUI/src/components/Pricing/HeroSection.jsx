import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center w-full py-16 px-4 overflow-hidden bg-transparent text-[var(--text-color)]">

      {/* 🌫️ Breathing golden aura */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(182,139,96,0.25),transparent_70%)] blur-3xl z-[2]"
        style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* ✴️ Floating golden particles */}
      <div className="absolute inset-0 overflow-hidden z-[3]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[rgba(182,139,96,0.25)]"
            initial={{
              y: Math.random() * 500,
              x: Math.random() * 1200,
              opacity: 0.3,
              scale: 0.8,
            }}
            animate={{
              y: [Math.random() * 500, -50],
              opacity: [0.3, 0.6, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 💎 Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-[4] max-w-3xl px-4"
      >
        <motion.h1
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[var(--accent-color)] via-[#8B5E33] to-[var(--highlight-color)] bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(182,139,96,0.25)]"
        >
          Drive Your Dealership Forward
        </motion.h1>

        <p className="text-base md:text-lg text-[var(--muted-text)] mb-8 leading-relaxed max-w-2xl mx-auto">
          Manage inventory, sales, and leads in one{" "}
          <span className="relative inline-block">
            <span className="relative z-[5]">connected</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 50"
              className="absolute bottom-[10%] left-0 w-full h-[1em] pointer-events-none z-[6] mix-blend-multiply opacity-70 blur-[0.5px]"
            >
              <defs>
                <linearGradient id="highlight2" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(255,250,160,0.55)" />
                  <stop offset="50%" stopColor="rgba(255,230,100,0.75)" />
                  <stop offset="100%" stopColor="rgba(255,250,160,0.55)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M10 28 Q100 45 190 26"
                fill="none"
                stroke="url(#highlight2)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.9, 0.75] }}
                transition={{ duration: 2, ease: "easeInOut", delay: 2.6 }}
              />
            </motion.svg>
          </span>{" "}
          platform — built to empower Kenya’s{" "}
          <span className="relative inline-block">
            <span className="relative z-[5]">dealers and buyers</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 50"
              className="absolute bottom-0 left-0 w-full h-[1em] pointer-events-none z-[6]"
            >
              <defs>
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
                  <feDisplacementMap in="SourceGraphic" scale="1" />
                </filter>
                <linearGradient id="inkGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(139,94,51,0.9)" />
                  <stop offset="50%" stopColor="rgba(102,66,33,0.95)" />
                  <stop offset="100%" stopColor="rgba(139,94,51,0.9)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M5 30 Q80 28 150 32 T295 31"
                fill="none"
                stroke="url(#inkGradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#noiseFilter)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 3 }}
              />
            </motion.svg>
          </span>
          .
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] shadow-md hover:shadow-lg transition"
          >
            Start Free Trial
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold border border-[var(--highlight-color)] text-[var(--accent-color)] hover:bg-[rgba(182,139,96,0.05)] transition"
          >
            Request a Demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}