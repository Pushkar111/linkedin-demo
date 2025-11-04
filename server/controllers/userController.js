// server/controllers/userController.js
import User from '../models/User.js';
import Post from '../models/Post.js';
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '../utils/cloudinaryUpload.js';

/**
 * @desc    Get user profile by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user's post count
    const postCount = await Post.countDocuments({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        ...user.toJSON(),
        postCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  Private
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    // Check if user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile',
      });
    }

    const { name, bio, headline, profileImage } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Handle profile image update
    if (profileImage && profileImage !== user.profileImage) {
      // Delete old image if it's not the default one
      if (
        user.profileImage &&
        !user.profileImage.includes('demo/image/upload')
      ) {
        const publicId = extractPublicId(user.profileImage);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(
        profileImage,
        'linkedin-clone/profiles'
      );
      user.profileImage = uploadResult.url;
    }

    // Update other fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (headline !== undefined) user.headline = headline;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's posts
 * @route   GET /api/users/:id/posts
 * @access  Public
 */
export const getUserPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const posts = await Post.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email profileImage headline')
      .populate('comments.user', 'name profileImage')
      .lean();

    const count = await Post.countDocuments({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search users
 * @route   GET /api/users/search
 * @access  Public
 */
export const searchUsers = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { headline: { $regex: q, $options: 'i' } },
      ],
    })
      .select('name email profileImage headline')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await User.countDocuments({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { headline: { $regex: q, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
