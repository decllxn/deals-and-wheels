// src/components/search/SearchInputBar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const categories = ["Make", "Model", "Fuel Type", "Body Type"];

const SearchInputBar = ({
  carType = "New",
  searchQuery,
  setSearchQuery,
  onOpen, // usually opens SearchModal
  inline = false, // optional: enable inline typing
  onSubmit, // optional: pass handler if using inline variant
}) => {
  const [catIndex, setCatIndex] = useState(0);

  // cycle placeholder every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCatIndex((idx) => (idx + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const placeholder = `Search ${carType} Cars by ${categories[catIndex]}`;

  // handle enter if inline search enabled
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inline && onSubmit) {
      onSubmit(searchQuery);
    }
  };

  return (
    <div className="mt-6 w-full max-w-xl">
      <div
        onClick={!inline ? onOpen : undefined}
        className="flex items-center bg-white/90 border border-[var(--border-color)] rounded-full shadow-lg px-5 py-3 backdrop-blur-sm transition-all cursor-text"
      >
        <FaSearch className="text-[var(--muted-text)] mr-3" />

        <AnimatePresence mode="wait">
          <motion.input
            key={placeholder}
            type="text"
            value={searchQuery}
            onChange={(e) =>
              inline ? setSearchQuery(e.target.value) : undefined
            }
            onFocus={!inline ? onOpen : undefined}
            onKeyDown={handleKeyDown}
            readOnly={!inline} // readOnly if using modal flow
            placeholder={placeholder}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow bg-transparent text-sm text-[var(--text-color)] placeholder-[var(--muted-text)] focus:outline-none"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchInputBar;