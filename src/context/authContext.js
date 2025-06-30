import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import apiClient from '../lib/apiClient';

// Helper to get saved user from localStorage
function getCurrentUser() {
  const stored = localStorage.getItem('userPayload');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Define User and AuthContext
const AuthContext = createContext();

/**
 * AuthProvider wraps the app and provides:
 *  - user: the current user object or null
 *  - isAuthenticated: boolean
 *  - loading: boolean
 *  - login: function to call with (email, password)
 *  - logout: function to clear auth
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);

  // On mount, initialize loading and user from localStorage
  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      setUser(existing);
    }
    setLoading(false);
  }, []);

  // Perform login via cookie-based endpoint
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const userPayload = response.data.user;
      // Save user info locally; token is managed via HTTP-only cookie
      localStorage.setItem('userPayload', JSON.stringify(userPayload));
      setUser(userPayload);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Perform logout by calling backend to clear cookie
  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout'); // assume you implement a logout endpoint that clears cookie
    } catch {
      // ignore errors
    }
    localStorage.removeItem('userPayload');
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(user);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isAuthenticated, loading, login, logout } },
    children
  );
}

// Custom hook to consume auth state
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return context; // { user, isAuthenticated, loading, login, logout }
}