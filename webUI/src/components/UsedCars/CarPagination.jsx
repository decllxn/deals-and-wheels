import React, { useEffect } from "react";

const UsedCarPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const delta = 2;
    const range = [];
    const withDots = [];
    let last;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (last) {
        if (i - last === 2) withDots.push(last + 1);
        else if (i - last > 2) withDots.push("...");
      }
      withDots.push(i);
      last = i;
    }

    return withDots;
  };

  const pages = getPages();

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && page > 1) onPageChange(page - 1);
      if (e.key === "ArrowRight" && page < totalPages) onPageChange(page + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [page, totalPages, onPageChange]);

  return (
    <nav
      className="flex flex-col items-center gap-3 sm:gap-4 mt-10 w-full px-4"
      aria-label="Pagination"
    >
      {/* PAGE COUNTER */}
      <p className="text-sm sm:text-base text-[var(--muted-text)] font-medium">
        Page{" "}
        <span className="text-[var(--text-color)] font-semibold">{page}</span>{" "}
        of{" "}
        <span className="text-[var(--text-color)] font-semibold">
          {totalPages}
        </span>
      </p>

      {/* PAGINATION BUTTONS */}
      <div
        className="flex flex-wrap justify-center items-center
                   gap-2 sm:gap-3 w-full max-w-full"
      >
        {/* FIRST */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          className="pagination-btn"
        >
          « First
        </button>

        {/* PREVIOUS */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="pagination-btn"
        >
          ← Prev
        </button>

        {/* NUMBERED PAGES */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={i}
              className="px-3 py-2 text-sm text-[var(--muted-text)] select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition min-w-[42px]
                ${
                  page === p
                    ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-md"
                    : "bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)] hover:bg-[var(--highlight-color)]"
                }
              `}
            >
              {p}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="pagination-btn"
        >
          Next →
        </button>

        {/* LAST */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="pagination-btn"
        >
          Last »
        </button>
      </div>

      {/* MOBILE WRAP FIX (ensures no overflow) */}
      <style>{`
        .pagination-btn {
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
          background: var(--surface-color);
          color: var(--text-color);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          min-width: 70px;
          text-align: center;
          white-space: nowrap;
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 420px) {
          .pagination-btn {
            min-width: 60px;
            padding: 0.45rem 0.65rem;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default UsedCarPagination;