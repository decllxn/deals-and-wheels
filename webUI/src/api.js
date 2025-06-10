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

// Fetch featured cars
export const fetchFeaturedCars = async () => {
  try {
    const response = await api.get("/auctions/auctions/?featured=true");
    return response.data.results || response.data; // Handle paginated and non-paginated responses
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    return [];
  }
};

// Fetch car images for a specific auction
export const fetchAuctionImages = async (auctionId) => {
  try {
    const response = await api.get(`/auctions/auctions/${auctionId}/`);
    return response.data.images || [];
  } catch (error) {
    console.error(`Error fetching images for auction ${auctionId}:`, error);
    return [];
  }
};

// Fetch all auctions with optional search and filters
export const fetchAuctions = async (query = "", filters = {}, page = 1, pageSize = 16) => {
  try {
    const params = { search: query, page: page, page_size: pageSize, ...filters };
    const response = await api.get("/auctions/auctions/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch ending soon auctions
export const fetchEndingSoonAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/ending-soon/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching ending soon auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch new listings auctions
export const fetchNewListingsAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/new-listings/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching new listings auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch no reserve auctions
export const fetchNoReserveAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/no-reserve/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching no reserve auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch lowest mileage auctions
export const fetchLowestMileageAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page: page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/lowest-mileage/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching lowest mileage auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch nearest auctions
export const fetchNearestAuctions = async (latitude, longitude, page = 1, pageSize = 16) => {
  try {
    const params = { latitude, longitude, page: page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/nearest/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearest auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch details for a specific auction
export const fetchAuctionDetails = async (auctionId) => {
  try {
    const response = await api.get(`/auctions/auctions/${auctionId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching auction details for ID ${auctionId}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch reviews with optional filters and pagination
export const fetchReviews = async (filters = {}, page = 1, pageSize = 10) => {
  try {
    const params = { page: page, page_size: pageSize, ...filters };
    const response = await api.get("/auctions/reviews/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch reviews for a specific auction
export const fetchAuctionReviews = async (auctionId, page = 1, pageSize = 10) => {
  try {
    const params = { auction: auctionId, page: page, page_size: pageSize };
    const response = await api.get("/auctions/reviews/", { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for auction ID ${auctionId}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to create a new review
export const createReview = async (auctionId, rating, comment) => {
  try {
    const response = await api.post("/auctions/reviews/", {
      auction: auctionId,
      rating: rating,
      comment: comment,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;