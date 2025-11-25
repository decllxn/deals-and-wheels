import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "./navLinks";

export default function NavMenu({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setOpen(false)}
          />

          {/* RIGHT SLIDE PANEL */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="
              fixed top-0 right-0 h-full z-50 w-72 sm:w-80
              bg-[var(--surface-color)] text-[var(--text-color)]
              shadow-xl flex flex-col overflow-hidden rounded-l-3xl
              border-l border-[var(--border-color)]
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
              {/* Logo "M." */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="text-[var(--accent-color)] font-bold text-3xl leading-none select-none"
                style={{ fontFamily: "'Inter', 'SF Pro Display', sans-serif" }}
              >
                M<span className="text-[var(--accent-color)]">.</span>
              </Link>

              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-[var(--highlight-color)]/20 transition-colors"
              >
                <X size={20} className="text-[var(--accent-color)]" />
              </button>
            </div>

            {/* NAV LINKS */}
            <nav className="flex flex-col flex-grow px-6 py-6 space-y-2">
              {navLinks.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className="relative block py-2 px-3 rounded-lg font-medium overflow-hidden group
                               text-[var(--text-color)] hover:text-white hover:bg-[var(--accent-color)] transition-all duration-200"
                  >
                    <span className="relative z-10">{label}</span>
                    <motion.span
                      className="absolute left-0 top-0 w-full h-full bg-[var(--accent-color)]/20 rounded-lg scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* FOOTER / CTA */}
            <div className="px-6 py-5 border-t border-[var(--border-color)] flex flex-col gap-2">
              <Link
                to="/dealer-dashboard"
                onClick={() => setOpen(false)}
                className="
                  block text-center px-4 py-2 rounded-lg
                  bg-[var(--accent-color)]
                  text-[var(--surface-color)] font-semibold
                  hover:bg-[var(--accent-hover)]
                  transition-all duration-200
                "
              >
                Dashboard
              </Link>

              <p className="text-xs text-[var(--muted-text)] text-center mt-1">
                © {new Date().getFullYear()} Zamara Technologies
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}