import axios from "axios";
import { BASE_URL } from "../constants";

// 🔹 Create an Axios instance specific to auth routes
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🧾 Register a new user
 */
export const registerUser = async (email, password, confirmPassword) => {
  try {
    const response = await authApi.post("/accounts/register/", {
      email,
      password,
      password2: confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * 🔑 Log in a user and return JWT tokens
 */
export const loginUser = async (email, password) => {
  try {
    const response = await authApi.post("/accounts/login/", {
      email,
      password,
    });
    return response.data; // { access, refresh }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * ♻️ Refresh the access token using a refresh token
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await authApi.post("/accounts/token/refresh/api", {
      refresh: refreshToken,
    });
    return response.data; // { access }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * 🚪 Log out the user (optional if backend supports token blacklisting)
 */
export const logoutUser = async (refreshToken) => {
  try {
    const response = await authApi.post("/accounts/logout/api/", {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * 🧠 Fetch current user profile
 * Requires: Authorization header
 */
export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await authApi.get("/accounts/profile/api/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * 🌐 Google Login
 * @param {string} token - Google ID token returned by @react-oauth/google
 * @returns {Promise<Object>} - JWT tokens and user info
 */
export const googleLogin = async (token) => {
  try {
    const response = await authApi.post("/accounts/google-login/", { token });
    return response.data; // { access, refresh, first_name, last_name, email }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default authApi;