// src/hooks/useSearch.js
import { useQuery } from "@tanstack/react-query";
import { searchListings } from "../api/Listings"

/**
 * Hook for fetching search results
 *
 * @param {string} query - The search term
 * @param {object} filters - Optional filters (make, model, body_type, etc.)
 * @param {object} options - React Query options
 */
export function useSearch(query, filters = {}, options = {}) {
  return useQuery({
    queryKey: ["search", query, filters],
    queryFn: () => searchListings({ q: query, ...filters }),
    enabled: !!query && query.length > 0, // only fetch if query exists
    staleTime: 1000 * 30, // cache for 30s
    ...options,
  });
}