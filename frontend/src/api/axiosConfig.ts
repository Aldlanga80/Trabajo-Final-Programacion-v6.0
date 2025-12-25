// frontend/src/api/axiosConfig.ts
import axios from "axios";

// Base URL: usa variable de entorno VITE_API_URL en Render o localhost para dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL
});

// Interceptor para agregar token si existe
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
