// server/utils/jwt.js
import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 * Creates and returns a signed JWT token for user authentication
 * @param {String} id - User ID
 * @returns {String} JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Send token response
 * Generates token and sends it in the response
 * @param {Object} user - User object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
export const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio,
      headline: user.headline,
    },
  });
};
