import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SearchResultsGrid from "./SearchResultsGrid";
import { usePopularTags } from "../../../hooks/usePopularTags";
import { useSuggestions } from "../../../hooks/useSuggestions";
import { useSearch } from "../../../hooks/useSearch";

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  // Popular tags
  const { data: popularTags = [], isLoading: loadingPopular } = usePopularTags();

  // Dynamic suggestions
  const { data: suggestions = {}, isLoading: loadingSuggestions } = useSuggestions(
    searchQuery,
    null,
    { enabled: searchQuery.length >= 2 }
  );

  // Search results
  const {
    data: searchResults = { results: [] },
    refetch: triggerSearch,
    isFetching: loadingResults,
  } = useSearch(searchQuery, {}, { enabled: false });

  // 🔹 Normalize API data safely
  const normalizeItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((item) => {
      if (typeof item === "string") return item;
      if (item?.label) return item.label;
      if (item?.name) return item.name;
      return "";
    }).filter(Boolean);
  };

  const safeSuggestions = {
    makes: normalizeItems(suggestions?.makes),
    car_types: normalizeItems(suggestions?.car_types),
    popular_searches: normalizeItems(suggestions?.popular_searches),
  };

  const safeResults = Array.isArray(searchResults?.results)
    ? searchResults.results
    : [];

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    triggerSearch();
  };

  const SuggestionGroup = ({ title, items }) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((text, i) => (
            <button
              key={i}
              onClick={() => {
                if (!text) return;
                setSearchQuery(text);
                handleSearch();
              }}
              className="bg-gray-200 dark:bg-neutral-600 text-gray-800 dark:text-gray-100 px-3 py-1 text-sm rounded-full hover:bg-gray-300 dark:hover:bg-neutral-500 transition"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    );
  };

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

            {/* Search Input */}
            <input
              type="text"
              autoFocus
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Suggestions vs Results */}
            {searchQuery.trim() === "" && safeResults.length === 0 ? (
              <div className="mt-6 space-y-6">
                <SuggestionGroup
                  title="Popular searches"
                  items={loadingPopular ? ["Loading..."] : normalizeItems(popularTags)}
                />
                <SuggestionGroup title="Popular makes" items={safeSuggestions.makes} />
                <SuggestionGroup title="Car types" items={safeSuggestions.car_types} />
              </div>
            ) : loadingResults ? (
              <p className="mt-4 text-gray-500 dark:text-gray-300">Loading...</p>
            ) : safeResults.length > 0 ? (
              <SearchResultsGrid results={safeResults} />
            ) : (
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                No results found. Try a different keyword.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;