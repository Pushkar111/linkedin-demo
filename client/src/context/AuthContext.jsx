// client/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import * as authService from '../services/authService';

/**
 * Authentication Context
 * Manages global authentication state and provides auth methods
 */
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Registration successful',
        description: 'Welcome to LinkedIn Clone!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        title: 'Registration failed',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${response.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: 'Login failed',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    navigate('/login');
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
