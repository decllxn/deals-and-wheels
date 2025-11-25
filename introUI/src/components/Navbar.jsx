import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-[rgba(255,255,255,0.22)]
        backdrop-blur-xl
        border-b border-[rgba(0,0,0,0.05)]
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/Zamara-logo-icon.png"
            alt="Zamara Logo"
            className="w-7 h-7 object-contain opacity-90"
          />
          <span className="text-xl font-semibold tracking-wide text-[var(--color-accent)]">
            zamara
          </span>
        </div>

        {/* Desktop Center Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-12 text-[15px] font-medium text-[var(--color-muted-text)]">
            <a 
              href="#about"
              className="hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#features"
              className="hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#waitlist"
              className="hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              Waitlist
            </a>
          </div>
        </div>

        {/* Desktop CTA */}
        <button
          className="
            hidden md:block
            px-5 py-2 rounded-lg text-sm font-semibold
            bg-[var(--color-accent)]
            text-white 
            hover:bg-[var(--color-accent-hover)]
            transition-all duration-300
            shadow-[0_2px_6px_rgba(0,0,0,0.12)]
          "
        >
          Join
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[var(--color-text)]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="
              md:hidden
              bg-[rgba(255,255,255,0.65)]
              backdrop-blur-xl
              border-b border-[rgba(0,0,0,0.07)]
              px-6 py-6
            "
          >
            <nav className="flex flex-col space-y-6 text-[17px] font-medium text-[var(--color-muted-text)]">
              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Features
              </a>
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Waitlist
              </a>

              <button
                className="
                  mt-3 w-full py-3 rounded-lg text-base font-semibold
                  bg-[var(--color-accent)]
                  text-white
                  hover:bg-[var(--color-accent-hover)]
                  transition-all duration-300
                  shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                "
              >
                Join
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}