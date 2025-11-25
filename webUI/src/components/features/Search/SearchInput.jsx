import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({ query, setQuery, onFocus }) {
  return (
    <div
      className="mb-4 flex justify-start"
    >
      <div
        className="flex items-center rounded-full px-5 py-3 w-full max-w-md border shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent-color)] transition-all"
        style={{
          backgroundColor: "var(--surface-color)",
          borderColor: "var(--border-color)",
        }}
      >
        <Search className="w-5 h-5 mr-3" style={{ color: "var(--muted-text)" }} />
        <input
          type="text"
          placeholder="Search cars..."
          value={query}
          onFocus={onFocus}
          readOnly
          className="flex-1 bg-transparent outline-none text-sm placeholder-[var(--muted-text)]"
          style={{ color: "var(--text-color)" }}
        />
      </div>
    </div>
  );
}