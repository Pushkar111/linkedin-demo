// server/controllers/postController.js
import Post from '../models/Post.js';
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '../utils/cloudinaryUpload.js';

/**
 * @desc    Get all posts (feed)
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email profileImage headline')
      .populate('comments.user', 'name profileImage')
      .lean();

    const count = await Post.countDocuments();

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
 * @desc    Get single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name email profileImage headline')
      .populate('comments.user', 'name profileImage');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new post
 * @route   POST /api/posts
 * @access  Private
 */
export const createPost = async (req, res, next) => {
  try {
    const { content, image } = req.body;

    let imageUrl = '';

    // Upload image to Cloudinary if provided
    if (image) {
      const uploadResult = await uploadToCloudinary(image, 'linkedin-clone/posts');
      imageUrl = uploadResult.url;
    }

    const post = await Post.create({
      user: req.user.id,
      content,
      image: imageUrl,
    });

    // Populate user data
    await post.populate('user', 'name email profileImage headline');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update post
 * @route   PUT /api/posts/:id
 * @access  Private
 */
export const updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    const { content, image } = req.body;

    // Handle image update
    if (image && image !== post.image) {
      // Delete old image if exists
      if (post.image) {
        const publicId = extractPublicId(post.image);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(image, 'linkedin-clone/posts');
      post.image = uploadResult.url;
    }

    if (content) {
      post.content = content;
    }

    await post.save();
    await post.populate('user', 'name email profileImage headline');

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    // Delete image from Cloudinary if exists
    if (post.image) {
      const publicId = extractPublicId(post.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle like on post
 * @route   POST /api/posts/:id/like
 * @access  Private
 */
export const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Like the post
      post.likes.push(userId);
    } else {
      // Unlike the post
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    await post.populate('user', 'name email profileImage headline');

    res.status(200).json({
      success: true,
      message: likeIndex === -1 ? 'Post liked' : 'Post unliked',
      data: {
        likes: post.likes,
        likeCount: post.likes.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add comment to post
 * @route   POST /api/posts/:id/comment
 * @access  Private
 */
export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    // Populate user data for the new comment
    await post.populate('comments.user', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete comment from post
 * @route   DELETE /api/posts/:postId/comment/:commentId
 * @access  Private
 */
export const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Check if user owns the comment or the post
    if (
      comment.user.toString() !== req.user.id &&
      post.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment',
      });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
