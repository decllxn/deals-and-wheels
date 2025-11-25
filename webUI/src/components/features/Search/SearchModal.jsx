import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import SearchResultsGrid from "./SearchResultsGrid";
import { usePopularTags } from "../../../hooks/usePopularTags";
import { useSuggestions } from "../../../hooks/useSuggestions";
import { useSearch } from "../../../hooks/useSearch";

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  const { data: popularTags = [], isLoading: loadingPopular } = usePopularTags();
  const { data: suggestions = {}, isLoading: loadingSuggestions } = useSuggestions(
    searchQuery,
    null,
    { enabled: searchQuery.length >= 2 }
  );
  const {
    data: searchResults = { results: [] },
    refetch: triggerSearch,
    isFetching: loadingResults,
  } = useSearch(searchQuery, {}, { enabled: false });

  const normalizeItems = (items) =>
    Array.isArray(items)
      ? items
          .map((i) => (typeof i === "string" ? i : i?.label || i?.name || ""))
          .filter(Boolean)
      : [];

  const safeSuggestions = {
    makes: normalizeItems(suggestions?.makes),
    car_types: normalizeItems(suggestions?.car_types),
    popular_searches: normalizeItems(suggestions?.popular_searches),
  };

  const safeResults = Array.isArray(searchResults?.results)
    ? searchResults.results
    : [];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleSearch = () => {
    if (searchQuery.trim()) triggerSearch();
  };

  const SuggestionGroup = ({ title, items }) => {
    if (!items?.length) return null;
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[var(--accent-color)] uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((text, i) => (
            <button
              key={i}
              onClick={() => {
                setSearchQuery(text);
                handleSearch();
              }}
              className="
                px-3 py-1 text-sm rounded-full 
                border border-[var(--border-color)]
                bg-[var(--surface-color)] text-[var(--text-color)]
                hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]
                transition-all duration-200
              "
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
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              relative w-full max-w-5xl max-h-[90vh] 
              bg-[var(--surface-color)] dark:bg-neutral-900 
              rounded-2xl shadow-2xl overflow-y-auto scrollbar-modern
              border border-[var(--border-color)]
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--surface-color)] rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center">
                  <Search className="text-white w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--accent-color)]">
                  Zamara Search
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close search modal"
                className="text-[var(--muted-text)] hover:text-[var(--accent-hover)] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-5 border-b border-[var(--border-color)] bg-[var(--bg-color)]">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-[var(--muted-text)] w-5 h-5" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Find your next ride..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="
                    w-full pl-10 pr-4 py-3 rounded-lg
                    bg-[var(--surface-color)] text-[var(--text-color)]
                    border border-[var(--border-color)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--highlight-color)]
                    placeholder-[var(--muted-text)]
                    transition
                  "
                />
              </div>
            </div>

            {/* Results / Suggestions */}
            <div className="p-6 space-y-6">
              {searchQuery.trim() === "" && safeResults.length === 0 ? (
                <>
                  <SuggestionGroup
                    title="Popular Searches"
                    items={loadingPopular ? ["Loading..."] : normalizeItems(popularTags)}
                  />
                  <SuggestionGroup title="Popular Makes" items={safeSuggestions.makes} />
                  <SuggestionGroup title="Car Types" items={safeSuggestions.car_types} />
                </>
              ) : loadingResults ? (
                <p className="text-[var(--muted-text)]">Searching...</p>
              ) : safeResults.length > 0 ? (
                <SearchResultsGrid results={safeResults} />
              ) : (
                <p className="text-[var(--muted-text)] text-sm">
                  No results found. Try a different keyword.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--muted-text)]">
              Powered by{" "}
              <span className="font-semibold text-[var(--accent-color)]">Zamara</span>{" "}
              Intelligence
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;