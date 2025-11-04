// client/src/pages/Register.jsx
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
  FormHelperText,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLinkedin } from 'react-icons/fa';

/**
 * Register Page Component
 * Handles new user registration
 */
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, isAuthenticated } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <Heading size="lg">Create Your Account</Heading>
          <Text color="gray.600">Join LinkedIn Clone today</Text>
        </VStack>

        {/* Error Alert */}
        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                size="lg"
              />
            </FormControl>

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
                  placeholder="Create a password"
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
              <FormHelperText>Must be at least 6 characters</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                size="lg"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              w="full"
              isLoading={loading}
              loadingText="Creating account..."
            >
              Create Account
            </Button>
          </VStack>
        </form>

        {/* Login Link */}
        <Text mt={6} textAlign="center">
          Already have an account?{' '}
          <ChakraLink as={Link} to="/login" color="brand.500" fontWeight="semibold">
            Sign in
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
