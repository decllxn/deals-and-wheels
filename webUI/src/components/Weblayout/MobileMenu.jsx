import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaWallet, FaUserTie, FaPhone, FaPlus } from "react-icons/fa";

const MobileMenu = ({ isOpen, setIsOpen, setShowAuthModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-24 left-0 w-full bg-[var(--bg-color)] shadow-lg border-t border-[var(--border-color)] z-40"
        >
          <div className="flex flex-col items-center py-5 space-y-5">
            <Link to="/deals" onClick={() => setIsOpen(false)}>Browse Cars</Link>
            <Link to="/dealers" onClick={() => setIsOpen(false)}>For Dealers</Link>
            <Link to="/finance" onClick={() => setIsOpen(false)}>Finance</Link>
            <Link to="/editorial" onClick={() => setIsOpen(false)}>Editorial</Link>
            <Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            <Link
              to="/sell-a-car"
              className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-semibold flex items-center space-x-2 transition shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <FaPlus size={16} />
              <span>Post Your Car</span>
            </Link>

            <button
              onClick={() => {
                setShowAuthModal(true);
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-[var(--highlight-color)] text-white rounded-lg text-sm font-medium transition shadow-md"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;