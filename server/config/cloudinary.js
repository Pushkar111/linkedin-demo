// server/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

/**
 * Configure Cloudinary for image upload and management
 * Used for storing user profile images and post images
 */
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('✅ Cloudinary configured successfully');
};

export default configureCloudinary;
export { cloudinary };
