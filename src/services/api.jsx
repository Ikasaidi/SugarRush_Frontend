import axios from "axios";

import { TokenService } from "./tokenService";

const API = axios.create({
  baseURL: "http://192.168.68.109:9696/api",
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
