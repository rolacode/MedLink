import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // Update if backend URL changes
});

// Automatically attach token to all requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Sending token:", token); // ✅ Helpful debug
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in localStorage");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
