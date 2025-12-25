import axios from "axios";

// Usar variable de entorno o fallback a localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL
});

// Agregar token si existe
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
