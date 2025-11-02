import axios from "axios";
import { BASE_URL } from "./constants";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility: Clean query params (avoid empty values being sent)
const cleanParams = (params) => {
  const cleaned = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

/* ---------------------------
   AUTHENTICATION
--------------------------- */

// Register a new user
export const registerUser = async (email, password, confirmPassword) => {
  try {
    const response = await api.post("/accounts/register/api/", {
      email,
      password,
      password2: confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/accounts/token/api/", {
      email,
      password,
    });
    return response.data; // returns { access, refresh }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Refresh access token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/accounts/token/refresh/api/", {
      refresh: refreshToken,
    });
    return response.data; // { access }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/* ---------------------------
   VEHICLE LISTINGS
--------------------------- */

// Fetch ALL car listings with optional search & filters
export const fetchListings = async (query = "", filters = {}, page = 1, pageSize = 16) => {
  try {
    const params = cleanParams({
      search: query,
      page,
      page_size: pageSize,
      ...filters,
    });
    const response = await api.get("/vehicles/listings/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Featured listings
export const fetchFeaturedListings = async () => {
  try {
    const response = await api.get("/vehicles/listings/", {
      params: { is_featured: true },
    });
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return [];
  }
};

// Shortcut functions (uses filters/ordering instead of separate endpoints)
export const fetchNewListings = async (page = 1, pageSize = 16) =>
  fetchListings("", { ordering: "-created_at" }, page, pageSize);

export const fetchLowestPriceListings = async (page = 1, pageSize = 16) =>
  fetchListings("", { ordering: "price" }, page, pageSize);

export const fetchHighestPriceListings = async (page = 1, pageSize = 16) =>
  fetchListings("", { ordering: "-price" }, page, pageSize);

export const fetchLowestMileageListings = async (page = 1, pageSize = 16) =>
  fetchListings("", { ordering: "mileage" }, page, pageSize);

// Listing details
export const fetchListingDetails = async (listingId) => {
  try {
    const response = await api.get(`/vehicles/listings/${listingId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing details (ID ${listingId}):`, error);
    throw error.response ? error.response.data : error.message;
  }
};

// Listing images
export const fetchListingImages = async (listingId) => {
  try {
    const response = await api.get(`/vehicles/listings/${listingId}/`);
    return response.data.images || [];
  } catch (error) {
    console.error(`Error fetching images for listing ${listingId}:`, error);
    return [];
  }
};

// Suggestions (for search autocomplete)
export const fetchListingSuggestions = async (query) => {
  try {
    const response = await api.get("/vehicles/listings/suggestions/", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching suggestions for "${query}":`, error);
    return [];
  }
};

export default api;