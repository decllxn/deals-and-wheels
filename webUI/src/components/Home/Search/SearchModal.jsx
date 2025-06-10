import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SearchResultsGrid from './SearchResultsGrid';

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);

  const popularSearches = ['BMW', 'Audi A1', 'SUVs', 'Ford Kuga'];
  const popularMakes = ['Audi', 'Kia', 'Hyundai', 'Volvo'];
  const carTypes = ['SUVs', 'Hatchbacks', 'Saloons', 'Estates'];

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const mockResults = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `${searchQuery} Result ${i + 1}`,
      description: `This is a placeholder description for ${searchQuery} result ${i + 1}.`,
    }));

    setSearchResults(mockResults);
  };

  const renderSuggestions = () => (
    <div className="mt-6 space-y-4">
      <SuggestionGroup title="Popular searches" items={popularSearches} />
      <SuggestionGroup title="Popular makes" items={popularMakes} />
      <SuggestionGroup title="Car types" items={carTypes} />

      <div className="pt-2 border-t border-gray-200 dark:border-neutral-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Not sure what you’re looking for?
        </p>
        <button
          onClick={() => alert('Redirect to quiz')}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Take the quiz
        </button>
      </div>
    </div>
  );

  const SuggestionGroup = ({ title, items }) => (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setSearchQuery(item);
              handleSearch();
            }}
            className="bg-gray-200 dark:bg-neutral-600 text-gray-800 dark:text-gray-100 px-3 py-1 text-sm rounded-full hover:bg-gray-300 dark:hover:bg-neutral-500 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 overflow-y-auto scrollbar-modern"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Advanced Search
            </h2>

            <input
              type="text"
              autoFocus
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {searchQuery.trim() === '' && searchResults.length === 0 ? (
              renderSuggestions()
            ) : (
              <SearchResultsGrid results={searchResults} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;