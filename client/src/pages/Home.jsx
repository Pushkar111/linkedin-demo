// client/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Spinner,
  Center,
  Text,
  Button,
} from '@chakra-ui/react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../services/postService';
import { useAuth } from '../context/AuthContext';

/**
 * Home Page Component
 * Displays the main feed with all posts
 */
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts(page, 20);
      setPosts(response.data);
      setHasMore(response.pagination.page < response.pagination.pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const loadMore = async () => {
    try {
      const response = await getAllPosts(page + 1, 20);
      setPosts([...posts, ...response.data]);
      setPage(page + 1);
      setHasMore(response.pagination.page < response.pagination.pages);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <Box maxW="2xl" mx="auto" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Feed</Heading>

        {/* Create Post - Only for authenticated users */}
        {isAuthenticated && <CreatePost onPostCreated={handlePostCreated} />}

        {/* Posts List */}
        {posts.length === 0 ? (
          <Center py={12}>
            <VStack>
              <Text fontSize="xl" color="gray.500">
                No posts yet
              </Text>
              <Text color="gray.400">
                Be the first to share something!
              </Text>
            </VStack>
          </Center>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handlePostDeleted}
              />
            ))}

            {/* Load More Button */}
            {hasMore && (
              <Center>
                <Button onClick={loadMore} colorScheme="brand" variant="outline">
                  Load More
                </Button>
              </Center>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Home;
