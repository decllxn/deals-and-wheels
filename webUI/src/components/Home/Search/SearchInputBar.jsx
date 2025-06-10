import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const categories = ['Make', 'Model', 'Fuel Type', 'Body Type'];

const SearchInputBar = ({ carType = 'New', onSearch }) => {
  const [catIndex, setCatIndex] = useState(0);
  const [query, setQuery] = useState('');

  // cycle through categories every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCatIndex(idx => (idx + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const placeholder = `Search ${carType} Cars by ${categories[catIndex]}`;

  return (
    <div className="mt-6 w-full max-w-xl">
      <div 
        className="flex items-center bg-white/90 border border-[var(--border-color)] rounded-full shadow-lg px-5 py-3 backdrop-blur-sm transition-all"
      >
        <FaSearch className="text-[var(--muted-text)] mr-3" />

        <AnimatePresence exitBeforeEnter>
          <motion.input
            key={placeholder}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow bg-transparent text-sm text-[var(--text-color)] placeholder-[var(--muted-text)] focus:outline-none"
            onKeyDown={e => e.key === 'Enter' && onSearch(query)}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchInputBar;