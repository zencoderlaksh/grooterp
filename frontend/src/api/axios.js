import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* request interceptor: attach token */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* auth APIs */
export const signup = (data) =>
  axiosInstance.post("/api/auth/signup", data);

export const login = (data) =>
  axiosInstance.post("/api/auth/login", data);

export default axiosInstance;
