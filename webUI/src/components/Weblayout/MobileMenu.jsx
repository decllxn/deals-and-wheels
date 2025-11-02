// src/components/MobileMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const MobileMenu = ({ isOpen, setIsOpen, setShowAuthModal, isAuthenticated, user, onLogout }) => {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const commonLinks = [
    { to: "/deals", label: "Browse Cars" },
    { to: "/dealers", label: "For Dealers" },
    { to: "/finance", label: "Finance" },
    { to: "/editorial", label: "Editorial" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 min-[1113px]:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[6.5rem] bottom-0 right-0 w-3/4 max-w-sm bg-[var(--bg-color)] shadow-lg z-40 overflow-y-auto min-[1113px]:hidden"
          >
            <motion.div
              className="flex flex-col py-5 px-6 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {commonLinks.map(({ to, label }) => (
                <motion.div key={to} variants={itemVariants}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-[var(--text-color)] hover:text-[var(--accent-color)] transition"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div className="w-full h-px bg-[var(--border-color)] my-4" variants={itemVariants} />

              {!isAuthenticated ? (
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg font-medium transition"
                  >
                    Sign In / Sign Up
                  </button>
                </motion.div>
              ) : (
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[var(--text-color)] font-semibold">{user?.first_name || "User"}</p>
                      <p className="text-[var(--muted-text)] text-sm">{user?.email}</p>
                    </div>
                    <Bell className="w-5 h-5 text-[var(--text-color)]" />
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium transition"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;