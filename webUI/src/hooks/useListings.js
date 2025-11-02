import { useQuery } from "@tanstack/react-query";
import { searchListings, getSuggestions, getPopularTags } from "@/api/listings";

// 🔹 Popular tags (landing page)
export function usePopularTags() {
  return useQuery({
    queryKey: ["popular-tags"],
    queryFn: getPopularTags,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}

// 🔹 Suggestions (debounced in component, enabled only if query.length >= 2)
export function useSuggestions(query, category, options = {}) {
  return useQuery({
    queryKey: ["suggestions", query, category],
    queryFn: () => getSuggestions({ q: query, category }),
    enabled: !!query && query.length >= 2 && (options.enabled ?? true),
    staleTime: 60 * 1000, // 1 min cache
  });
}

// 🔹 Search results (for SearchModal)
export function useSearch(query, filters = {}, options = {}) {
  return useQuery({
    queryKey: ["search", { query, ...filters }],
    queryFn: () => searchListings({ q: query, ...filters }),
    enabled: !!query && (options.enabled ?? true),
    keepPreviousData: true, // smoother pagination if added later
  });
}