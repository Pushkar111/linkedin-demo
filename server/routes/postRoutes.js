// server/routes/postRoutes.js
import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import {
  createPostValidation,
  createCommentValidation,
  objectIdValidation,
  validate,
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', objectIdValidation('id'), validate, getPostById);

// Protected routes
router.post('/', protect, createPostValidation, validate, createPost);
router.put('/:id', protect, objectIdValidation('id'), createPostValidation, validate, updatePost);
router.delete('/:id', protect, objectIdValidation('id'), validate, deletePost);

// Like and comment routes
router.post('/:id/like', protect, objectIdValidation('id'), validate, toggleLike);
router.post('/:id/comment', protect, objectIdValidation('id'), createCommentValidation, validate, addComment);
router.delete('/:postId/comment/:commentId', protect, deleteComment);

export default router;
