// server/routes/userRoutes.js
import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
  searchUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { objectIdValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/search', searchUsers);
router.get('/:id', objectIdValidation('id'), validate, getUserProfile);
router.get('/:id/posts', objectIdValidation('id'), validate, getUserPosts);

// Protected routes
router.put('/:id', protect, objectIdValidation('id'), validate, updateUserProfile);

export default router;
