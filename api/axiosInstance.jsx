import axios from "axios";
import { TokenService } from "./tokenService";

export const api = axios.create({
    baseURL: "http://192.168.190.1:9696",

});

api.interceptors.request.use(async (config) => {
    const token = await TokenService.getToken();
    console.log("Token retrieved:", token ? "Token exists" : "No token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization header set");
    }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
);