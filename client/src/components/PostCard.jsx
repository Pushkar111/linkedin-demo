// client/src/components/PostCard.jsx
import { useState } from 'react';
import {
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Collapse,
  Textarea,
  useToast,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaComment, FaEllipsisH, FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleLike, addComment, deleteComment, deletePost } from '../services/postService';
import { formatDate } from '../utils/dateUtils';

/**
 * Post Card Component
 * Displays a single post with like/comment functionality
 */
const PostCard = ({ post, onUpdate, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isOwnPost = user?.id === post.user?._id || user?.id === post.user?.id;

  const handleLike = async () => {
    try {
      await toggleLike(post._id);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update like',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setLoading(true);

    try {
      const response = await addComment(post._id, { text: commentText });
      setComments([...comments, response.data]);
      setCommentText('');
      toast({
        title: 'Comment added',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(post._id);
      toast({
        title: 'Post deleted',
        status: 'success',
        duration: 2000,
      });
      if (onDelete) onDelete(post._id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box
      bg={bgColor}
      p={6}
      rounded="lg"
      shadow="md"
      border="1px"
      borderColor={borderColor}
      mb={4}
    >
      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <HStack as={Link} to={`/profile/${post.user?._id || post.user?.id}`} spacing={3}>
          <Avatar size="md" name={post.user?.name} src={post.user?.profileImage} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{post.user?.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {post.user?.headline || 'Professional'}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {formatDate(post.createdAt)}
            </Text>
          </VStack>
        </HStack>

        {isOwnPost && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisH />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={() => onUpdate && onUpdate(post)}>
                Edit
              </MenuItem>
              <MenuItem icon={<FaTrash />} onClick={handleDeletePost} color="red.500">
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>

      {/* Content */}
      <Text mb={4} whiteSpace="pre-wrap">
        {post.content}
      </Text>

      {/* Image */}
      {post.image && (
        <Image
          src={post.image}
          alt="Post image"
          maxH="500px"
          w="full"
          objectFit="cover"
          rounded="md"
          mb={4}
        />
      )}

      {/* Stats */}
      <HStack justify="space-between" mb={2} fontSize="sm" color="gray.500">
        <Text>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</Text>
        <Text>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</Text>
      </HStack>

      <Divider my={3} />

      {/* Actions */}
      <HStack spacing={4} mb={3}>
        <Button
          leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
          variant="ghost"
          size="sm"
          onClick={handleLike}
          colorScheme={isLiked ? 'red' : 'gray'}
        >
          Like
        </Button>
        <Button
          leftIcon={<FaComment />}
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          Comment
        </Button>
      </HStack>

      {/* Comments Section */}
      <Collapse in={showComments}>
        <VStack align="stretch" mt={4} spacing={3}>
          {/* Add Comment */}
          <HStack>
            <Avatar size="sm" name={user?.name} src={user?.profileImage} />
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="sm"
              rows={2}
            />
            <Button
              size="sm"
              colorScheme="brand"
              onClick={handleComment}
              isLoading={loading}
              isDisabled={!commentText.trim()}
            >
              Post
            </Button>
          </HStack>

          {/* Comments List */}
          {comments.map((comment) => (
            <HStack key={comment._id} align="start" pl={4}>
              <Avatar size="sm" name={comment.user?.name} src={comment.user?.profileImage} />
              <Box flex={1} bg={useColorModeValue('gray.50', 'gray.700')} p={3} rounded="md">
                <Text fontWeight="bold" fontSize="sm">{comment.user?.name}</Text>
                <Text fontSize="sm">{comment.text}</Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {formatDate(comment.createdAt)}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default PostCard;
