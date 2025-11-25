import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading complete after 2.2s
    const timer = setTimeout(() => setIsVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                     bg-[var(--surface-color)] dark:bg-gray-950"
        >
          {/* Spinning logo */}
          <motion.img
            src="/pngs/Zamara-logo-icon.png"
            alt="Zamara logo"
            className="w-16 h-16 object-contain drop-shadow-xl"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
            }}
          />

          {/* Brand text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-sm font-medium tracking-[0.15em] uppercase 
                       text-[var(--muted-text)] dark:text-gray-400"
          >
            Loading
          </motion.p>

          {/* Soft glow / ambient aura */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-[var(--accent-color)]/15 blur-3xl"
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{
              scale: [0.6, 1, 0.6],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}