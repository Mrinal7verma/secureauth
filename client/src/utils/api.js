import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    // Handle token expiration - only redirect for actual auth failures
    if (response && response.status === 401) {
      // Only remove token and redirect if we're not already on auth pages
      const currentPath = window.location.pathname;
      if (
        !["/login", "/register", "/forgot-password", "/"].includes(currentPath)
      ) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(response?.data?.message || "Something went wrong");
  }
);

// Auth API calls
export const loginUser = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};

export const logoutUser = async () => {
  // For JWT, we just need to remove the token client-side
  // No server request needed as JWT tokens are stateless
  return Promise.resolve();
};

export const getCurrentUser = async () => {
  return api.get("/users/profile");
};

export const forgotPassword = async (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token, password) => {
  return api.post(`/auth/reset-password/${token}`, { password });
};

// User API calls
export const getAllUsers = async () => {
  return api.get(`/users`);
};

export const getUserById = async (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = async (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

export default api;
