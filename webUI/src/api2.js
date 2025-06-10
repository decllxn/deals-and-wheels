import axios from "axios";
import { BASE_URL } from "./constants";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to register a user
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

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/accounts/token/api/", {
      email,
      password,
    });
    return response.data; // Returns tokens (access & refresh)
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to refresh the token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/accounts/token/refresh/api/", {
      refresh: refreshToken,
    });
    return response.data; // Returns new access token
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch featured car listings
export const fetchFeaturedListings = async () => {
  try {
    const response = await api.get("/vehicles/listings/?is_featured=true");
    return response.data.results || response.data; // Handle paginated and non-paginated responses
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return [];
  }
};

// Fetch car listing images for a specific listing
export const fetchListingImages = async (listingId) => {
  try {
    const response = await api.get(`/vehicles/listings/${listingId}/`);
    return response.data.images || [];
  } catch (error) {
    console.error(`Error fetching images for listing ${listingId}:`, error);
    return [];
  }
};

// Fetch all car listings with optional search and filters
export const fetchListings = async (query = "", filters = {}, page = 1, pageSize = 16) => {
  try {
    const params = { search: query, page: page, page_size: pageSize, ...filters };
    const response = await api.get("/vehicles/listings/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch new car listings
export const fetchNewListings = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/vehicles/listings/new-listings/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching new listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch lowest price car listings
export const fetchLowestPriceListings = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/vehicles/listings/lowest-price/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching lowest price listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch highest price car listings
export const fetchHighestPriceListings = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/vehicles/listings/highest-price/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching highest price listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch lowest mileage car listings
export const fetchLowestMileageListings = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/vehicles/listings/lowest-mileage/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching lowest mileage listings:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch details for a specific car listing
export const fetchListingDetails = async (listingId) => {
  try {
    const response = await api.get(`/vehicles/listings/${listingId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing details for ID ${listingId}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch car listing suggestions
export const fetchListingSuggestions = async (query) => {
  try {
    const params = { query };
    const response = await api.get("/vehicles/listings/suggestions/", { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing suggestions for query "${query}":`, error);
    return [];
  }
};

export default api;