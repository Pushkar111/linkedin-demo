// client/src/pages/Login.jsx
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLinkedin } from 'react-icons/fa';

/**
 * Login Page Component
 * Handles user authentication
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" py={12} px={4}>
      <Box
        maxW="md"
        w="full"
        bg={bgColor}
        boxShadow="2xl"
        rounded="lg"
        p={8}
      >
        {/* Logo */}
        <VStack spacing={2} mb={8} textAlign="center">
          <Box color="brand.500" fontSize="4xl">
            <FaLinkedin />
          </Box>
          <Heading size="lg">Welcome Back</Heading>
          <Text color="gray.600">Sign in to continue to LinkedIn Clone</Text>
        </VStack>

        {/* Error Alert */}
        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                size="lg"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    aria-label="Toggle password visibility"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              w="full"
              isLoading={loading}
              loadingText="Signing in..."
            >
              Sign In
            </Button>
          </VStack>
        </form>

        {/* Register Link */}
        <Text mt={6} textAlign="center">
          Don't have an account?{' '}
          <ChakraLink as={Link} to="/register" color="brand.500" fontWeight="semibold">
            Sign up
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
