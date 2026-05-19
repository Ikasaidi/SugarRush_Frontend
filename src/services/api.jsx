import axios from "axios";

import { TokenService } from "./tokenService";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://sugarrush-backend-l4f0.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// =======================================================
// REQUEST INTERCEPTOR
// =======================================================

API.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// =======================================================
// RESPONSE INTERCEPTOR
// =======================================================

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("API ERROR:", error?.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default API;
