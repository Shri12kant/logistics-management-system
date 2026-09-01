const API_BASE_URL =
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
        ? "https://pragya-shipping-backend.onrender.com"
        : "http://localhost:8080");

export default API_BASE_URL;
