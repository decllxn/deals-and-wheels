// src/pages/dealers/dealerApi.js
import axios from "axios";

export const dealerSignup = async (formData) => {
  const { data } = await axios.post(
    "http://127.0.0.1:8000/dealers/api/signup/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};