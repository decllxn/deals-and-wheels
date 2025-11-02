import axios from "axios";
import { BASE_URL } from "./constants";

// Create a reusable Axios instance for all non-auth endpoints
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/* 🚗 AUCTIONS                                                                */
/* -------------------------------------------------------------------------- */

// Fetch featured cars
export const fetchFeaturedCars = async () => {
  try {
    const response = await api.get("/auctions/auctions/?featured=true");
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    return [];
  }
};

// Fetch images for a specific auction
export const fetchAuctionImages = async (auctionId) => {
  try {
    const response = await api.get(`/auctions/auctions/${auctionId}/`);
    return response.data.images || [];
  } catch (error) {
    console.error(`Error fetching images for auction ${auctionId}:`, error);
    return [];
  }
};

// Fetch all auctions with optional filters
export const fetchAuctions = async (query = "", filters = {}, page = 1, pageSize = 16) => {
  try {
    const params = { search: query, page, page_size: pageSize, ...filters };
    const response = await api.get("/auctions/auctions/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch auctions ending soon
export const fetchEndingSoonAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/ending-soon/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching ending soon auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch new listings
export const fetchNewListingsAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/new-listings/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching new listings auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch no-reserve auctions
export const fetchNoReserveAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/no-reserve/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching no-reserve auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch lowest mileage auctions
export const fetchLowestMileageAuctions = async (page = 1, pageSize = 16) => {
  try {
    const params = { page, page_size: pageSize };
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
    const params = { latitude, longitude, page, page_size: pageSize };
    const response = await api.get("/auctions/auctions/nearest/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearest auctions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch specific auction details
export const fetchAuctionDetails = async (auctionId) => {
  try {
    const response = await api.get(`/auctions/auctions/${auctionId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching auction details for ID ${auctionId}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

/* -------------------------------------------------------------------------- */
/* ⭐ REVIEWS                                                                 */
/* -------------------------------------------------------------------------- */

// Fetch reviews with optional filters
export const fetchReviews = async (filters = {}, page = 1, pageSize = 10) => {
  try {
    const params = { page, page_size: pageSize, ...filters };
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
    const params = { auction: auctionId, page, page_size: pageSize };
    const response = await api.get("/auctions/reviews/", { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for auction ID ${auctionId}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new review
export const createReview = async (auctionId, rating, comment) => {
  try {
    const response = await api.post("/auctions/reviews/", {
      auction: auctionId,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;