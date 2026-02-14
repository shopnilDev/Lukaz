import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true, 
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data",
  },
});

//  Add interceptor to include Authorization token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;









