import React from "react";
import { TrendingUp } from "lucide-react";
import { usePopularTags } from "@/hooks/usePopularTags";

export default function PopularTags({ setSearchQuery, openModal }) {
  const { data: popularTags, isLoading, isError } = usePopularTags();

  return (
    <div className="flex flex-wrap gap-2 justify-start mt-4">
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
        ))}

      {isError && (
        <span className="text-xs text-gray-500 italic">
          Popular tags unavailable
        </span>
      )}

      {!isLoading &&
        !isError &&
        popularTags?.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSearchQuery(tag.label);
              openModal();
            }}
            className="flex items-center text-[11px] px-3 py-1.5 rounded-full border transition-all duration-200 ease-in-out hover:shadow-md"
            style={{
              backgroundColor: "var(--surface-color)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
          >
            <TrendingUp
              className="w-3 h-3 mr-1"
              style={{ color: "var(--accent-color)" }}
            />
            {tag.label}
          </button>
        ))}
    </div>
  );
}