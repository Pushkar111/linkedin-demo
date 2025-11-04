// client/src/components/CreatePost.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Textarea,
  VStack,
  Image,
  IconButton,
  HStack,
  useToast,
  useColorModeValue,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaImage } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/postService';
import { fileToBase64, validateImage } from '../utils/imageUtils';

/**
 * Create Post Component
 * Allows users to create new posts with text and optional image
 */
const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      validateImage(file);
      const base64 = await fileToBase64(file);
      setImage(base64);
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      toast({
        title: 'Invalid image',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast({
        title: 'Post content required',
        description: 'Please enter some text for your post',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const postData = {
        content: content.trim(),
        ...(image && { image }),
      };

      const response = await createPost(postData);
      
      toast({
        title: 'Post created',
        description: 'Your post has been shared successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setContent('');
      removeImage();

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      toast({
        title: 'Failed to create post',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* User info */}
          <HStack spacing={3}>
            <Avatar size="sm" name={user?.name} src={user?.profileImage} />
            <Text fontWeight="medium">{user?.name}</Text>
          </HStack>

          {/* Text input */}
          <Textarea
            placeholder="What do you want to talk about?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size="lg"
            minH="120px"
            resize="vertical"
            _focus={{ borderColor: 'brand.500' }}
          />

          {/* Image preview */}
          {imagePreview && (
            <Box position="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                maxH="300px"
                w="full"
                objectFit="cover"
                rounded="md"
              />
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                colorScheme="red"
                position="absolute"
                top={2}
                right={2}
                onClick={removeImage}
                aria-label="Remove image"
              />
            </Box>
          )}

          {/* Actions */}
          <HStack justify="space-between">
            <HStack>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <Button
                leftIcon={<FaImage />}
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
              >
                Add Photo
              </Button>
            </HStack>

            <Button
              type="submit"
              colorScheme="brand"
              isLoading={loading}
              loadingText="Posting..."
              isDisabled={!content.trim()}
            >
              Post
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default CreatePost;
