import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, logoutUser, getCurrentUser } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await getCurrentUser();
        setUser(userData.data); // API returns data in 'data' field
        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        // Only clear token if it's definitely invalid (401 error)
        if (
          err.includes &&
          (err.includes("401") || err.includes("Unauthorized"))
        ) {
          localStorage.removeItem("token");
        }
        setUser(null);
        setIsAuthenticated(false);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { user: userData, token } = await loginUser(email, password);

      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return userData;
    } catch (err) {
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
