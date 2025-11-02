import axios from "axios";
import BASE_URL from "./URL";

const API_BASE = `${BASE_URL}/vehicles`;

// 🔹 Search listings
export const searchListings = async (params) => {
  const response = await axios.get(`${API_BASE}/listings/search/`, { params });
  return response.data;
};

// 🔹 Get suggestions (with optional query + category)
export const getSuggestions = async ({ q, category }) => {
  const response = await axios.get(`${API_BASE}/listings/suggestions/`, {
    params: { q, category },
  });
  return response.data;
};

// 🔹 Get popular tags
export const getPopularTags = async () => {
  const response = await axios.get(`${API_BASE}/popular-tags/`);
  return response.data;
};