import { create } from "zustand";
import axios from "axios";
import { Car } from "@/types/Car";
import { Dealer } from "@/types/Dealer";

interface SearchState {
  query: string;
  results: { cars: Car[]; dealers: Dealer[] };
  loading: boolean;
  error: string | null;
  setQuery: (q: string) => void;
  searchAll: (q: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: { cars: [], dealers: [] },
  loading: false,
  error: null,

  setQuery: (q) => set({ query: q }),

  searchAll: async (q: string) => {
    if (!q.trim()) {
      set({ results: { cars: [], dealers: [] }, loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await axios.get<{ cars: Car[]; dealers: Dealer[] }>(
        `http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(q)}`
      );
      set({ results: res.data, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "Failed to fetch",
        loading: false,
        results: { cars: [], dealers: [] },
      });
    }
  },
}));
