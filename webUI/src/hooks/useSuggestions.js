// src/hooks/useSuggestions.js
import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../api/Listings"; // <-- your API layer

/**
 * Hook for fetching search suggestions
 *
 * @param {string} query - The search term (>= 2 chars)
 * @param {string|null} category - Optional category filter
 * @param {object} options - React Query options
 */
export function useSuggestions(query, category = null, options = {}) {
  return useQuery({
    queryKey: ["suggestions", query, category],
    queryFn: () => getSuggestions({ q: query, category }),
    enabled: !!query && query.length >= 2, // only fetch if >=2 chars
    staleTime: 1000 * 60, // cache for 1 min
    ...options,
  });
}