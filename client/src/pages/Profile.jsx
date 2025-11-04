// client/src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Heading,
  Text,
  Button,
  Spinner,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, getUserPosts } from '../services/userService';
import PostCard from '../components/PostCard';
import { fileToBase64, validateImage } from '../utils/imageUtils';

/**
 * Profile Page Component
 * Displays user profile and their posts
 */
const Profile = () => {
  const { id } = useParams();
  const { user: currentUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(id);
      setProfile(response.data);
      setEditForm({
        name: response.data.name,
        headline: response.data.headline || '',
        bio: response.data.bio || '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getUserPosts(id);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await updateUserProfile(id, editForm);
      setProfile(response.data);
      updateUser(response.data);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 2000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      validateImage(file);
      const base64 = await fileToBase64(file);
      setEditForm({ ...editForm, profileImage: base64 });
    } catch (error) {
      toast({
        title: 'Invalid image',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Center>
    );
  }

  if (!profile) {
    return (
      <Center h="50vh">
        <Text>Profile not found</Text>
      </Center>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" py={6}>
      <VStack spacing={6} align="stretch">
        {/* Profile Header */}
        <Box bg={bgColor} p={8} rounded="lg" shadow="md" border="1px" borderColor={borderColor}>
          <HStack spacing={6} align="start">
            <Avatar size="2xl" name={profile.name} src={profile.profileImage} />
            <VStack flex={1} align="start" spacing={2}>
              <HStack justify="space-between" w="full">
                <Heading size="lg">{profile.name}</Heading>
                {isOwnProfile && (
                  <Button leftIcon={<FaEdit />} size="sm" onClick={onOpen}>
                    Edit Profile
                  </Button>
                )}
              </HStack>
              <Text fontSize="lg" color="gray.600">
                {profile.headline || 'Professional'}
              </Text>
              <Text color="gray.500">{profile.email}</Text>
              {profile.bio && <Text mt={2}>{profile.bio}</Text>}
              <HStack spacing={4} mt={2}>
                <Text fontWeight="bold">{profile.postCount || 0} posts</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        <Divider />

        {/* User Posts */}
        <Box>
          <Heading size="md" mb={4}>Posts</Heading>
          {posts.length === 0 ? (
            <Center py={12}>
              <Text color="gray.500">No posts yet</Text>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1 }} spacing={4}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Headline</FormLabel>
                <Input
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  placeholder="e.g., Software Engineer at Google"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </FormControl>
              <Button colorScheme="brand" w="full" onClick={handleEditProfile}>
                Save Changes
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
