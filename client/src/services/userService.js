// client/src/services/userService.js
import api from './api';

/**
 * User service
 * Handles user profile and search operations
 */

export const getUserProfile = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserProfile = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const getUserPosts = async (id, page = 1, limit = 20) => {
  const response = await api.get(`/users/${id}/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const searchUsers = async (query, page = 1, limit = 10) => {
  const response = await api.get(`/users/search?q=${query}&page=${page}&limit=${limit}`);
  return response.data;
};
