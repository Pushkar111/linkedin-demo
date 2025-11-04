// client/src/services/postService.js
import api from './api';

/**
 * Post service
 * Handles all post-related API calls
 */

export const getAllPosts = async (page = 1, limit = 20) => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const toggleLike = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const addComment = async (id, commentData) => {
  const response = await api.post(`/posts/${id}/comment`, commentData);
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comment/${commentId}`);
  return response.data;
};
