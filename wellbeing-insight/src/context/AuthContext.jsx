import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Use our API service to verify the token
        const response = await authService.getCurrentUser();
        setCurrentUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const register = async (userData) => {
    setError(null);
    try {
      const response = await authService.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setCurrentUser(user);
      return { user, token };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const response = await authService.login(credentials);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setCurrentUser(user);
      return { user, token };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updateUserProfile = async (profileData) => {
    try {
      // This would be a real API call in a production app
      // const response = await api.put('/users/profile', profileData);
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;