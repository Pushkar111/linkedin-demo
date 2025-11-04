// server/utils/cloudinaryUpload.js
import { cloudinary } from '../config/cloudinary.js';

/**
 * Upload image to Cloudinary
 * Handles image upload with automatic optimization and transformation
 * @param {String} base64Image - Base64 encoded image string
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>} Upload result with secure URL
 */
export const uploadToCloudinary = async (base64Image, folder = 'linkedin-clone') => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Delete image from Cloudinary
 * Removes image from Cloudinary storage
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

/**
 * Extract public ID from Cloudinary URL
 * Parses Cloudinary URL to get the public ID
 * @param {String} url - Cloudinary image URL
 * @returns {String} Public ID
 */
export const extractPublicId = (url) => {
  if (!url) return null;
  
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const publicId = lastPart.split('.')[0];
  
  // Include folder if exists
  const folderIndex = parts.indexOf('linkedin-clone');
  if (folderIndex !== -1) {
    return `linkedin-clone/${publicId}`;
  }
  
  return publicId;
};
