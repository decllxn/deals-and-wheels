import React from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const MobileMenu = ({ isOpen, setIsOpen, setShowAuthModal }) => {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-[6.5rem] bottom-0 right-0 w-3/4 max-w-sm bg-[var(--bg-color)] shadow-lg z-40 overflow-y-auto no-scrollbar"
          >
            <motion.div
              className="flex flex-col items-start py-5 px-6 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Links */}
              {[
                { to: "/deals", label: "Browse Cars" },
                { to: "/dealers", label: "For Dealers" },
                { to: "/finance", label: "Finance" },
                { to: "/editorial", label: "Editorial" },
                { to: "/about-us", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <motion.div key={to} variants={itemVariants}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div className="w-full h-px bg-[var(--border-color)] my-4" variants={itemVariants} />

              {/* Post Your Car Button */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/sell-a-car"
                  className="w-full px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-base font-semibold flex items-center justify-center space-x-2 transition shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPlus size={18} />
                  <span>Post Your Car</span>
                </Link>
              </motion.div>

              {/* Sign In Button */}
              <motion.div variants={itemVariants}>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-[var(--highlight-color)] text-[var(--text-color)] rounded-lg text-base font-medium transition shadow-md"
                >
                  Sign In
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;