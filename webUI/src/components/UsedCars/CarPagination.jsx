import React, { useEffect } from "react";

const UsedCarPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const delta = 2;
    const range = [];
    const withDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          withDots.push(l + 1);
        } else if (i - l > 2) {
          withDots.push("...");
        }
      }
      withDots.push(i);
      l = i;
    }
    return withDots;
  };

  const pages = getPages();

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && page > 1) onPageChange(page - 1);
      if (e.key === "ArrowRight" && page < totalPages) onPageChange(page + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [page, totalPages, onPageChange]);

  return (
    <nav className="flex flex-col items-center gap-4 mt-10" aria-label="Pagination">
      <p className="text-sm text-[var(--muted-text)] font-medium">
        Page <span className="text-[var(--text-color)]">{page}</span> of{" "}
        <span className="text-[var(--text-color)]">{totalPages}</span>
      </p>

      <div className="flex flex-wrap justify-center items-center space-x-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          « First
        </button>

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          ← Prev
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-3 py-2 text-[var(--muted-text)]">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition
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

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          Next →
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 rounded-lg border text-sm font-medium transition
                     bg-[var(--surface-color)] text-[var(--text-color)] border-[var(--border-color)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-[var(--accent-hover)] hover:text-white"
        >
          Last »
        </button>
      </div>
    </nav>
  );
};

export default UsedCarPagination;