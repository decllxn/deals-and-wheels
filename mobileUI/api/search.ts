import api from "./client"

export async function searchAll(query: string) {
  if (!query) return { cars: [], dealers: [] };
  const res = await api.get(`/search/`, { params: { q: query } });
  return res.data; // { cars: [...], dealers: [...] }
}