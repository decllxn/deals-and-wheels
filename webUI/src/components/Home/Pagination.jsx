import React, { useEffect } from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Generate compact pagination with ellipses
  const getPageNumbers = () => {
    const delta = 2; // how many numbers to show around current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  // Keyboard navigation: Left / Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && page > 1) {
        onPageChange(page - 1);
      } else if (e.key === "ArrowRight" && page < totalPages) {
        onPageChange(page + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, totalPages, onPageChange]);

  return (
    <nav
      className="flex flex-col items-center gap-4 mt-10"
      aria-label="Pagination Navigation"
    >
      {/* Page Info */}
      <p className="text-sm text-[var(--muted-text)] font-medium">
        Page <span className="text-[var(--text-color)]">{page}</span> of{" "}
        <span className="text-[var(--text-color)]">{totalPages}</span>
      </p>

      <div className="flex flex-wrap justify-center items-center space-x-2">
        {/* First Button */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition-all
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          « First
        </button>

        {/* Prev Button */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition-all
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={idx}
              className="px-3 py-2 text-[var(--muted-text)] select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all
                ${
                  page === p
                    ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-md"
                    : "bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)] hover:bg-[var(--highlight-color)]"
                }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition-all
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          Next →
        </button>

        {/* Last Button */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition-all
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          Last »
        </button>
      </div>

      {/* Jump To Page (for large datasets) */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="jumpToPage" className="text-[var(--muted-text)]">
            Jump to:
          </label>
          <input
            id="jumpToPage"
            type="number"
            min="1"
            max={totalPages}
            defaultValue={page}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = Number(e.target.value);
                if (value >= 1 && value <= totalPages) {
                  onPageChange(value);
                }
              }
            }}
            className="w-16 px-2 py-1 rounded-lg border bg-[var(--surface-color)] 
                       text-[var(--text-color)] border-[var(--border-color)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
          />
        </div>
      )}
    </nav>
  );
};

export default Pagination; 