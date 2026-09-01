import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Expired Sessions / 401 Errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response?.status === 401 &&
            !window.location.pathname.includes("/admin/login")
        ) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            toast.error("Session expired. Please login again.");
            setTimeout(() => {
                window.location.href = "/admin/login";
            }, 500);
        }
        return Promise.reject(error);
    }
);

export default api;
