// client/src/components/Navbar.jsx
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  useColorModeValue,
  Container,
  Text,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, BellIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Navigation Bar Component
 * Shows user info, navigation links, and theme toggle
 */
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleProfileClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link to="/">
            <HStack spacing={2} cursor="pointer">
              <Box color="brand.500" fontSize="2xl">
                <FaLinkedin />
              </Box>
              <Heading size="md" color="brand.500">
                LinkedIn Clone
              </Heading>
            </HStack>
          </Link>

          {/* Right side */}
          <Flex alignItems="center">
            <HStack spacing={4}>
              {/* Theme toggle */}
              <IconButton
                size="md"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                aria-label="Toggle theme"
                onClick={toggleColorMode}
                variant="ghost"
              />

              {isAuthenticated ? (
                <>
                  {/* Notifications - placeholder */}
                  <IconButton
                    size="md"
                    icon={<BellIcon />}
                    aria-label="Notifications"
                    variant="ghost"
                  />

                  {/* User menu */}
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded="full"
                      variant="link"
                      cursor="pointer"
                      minW={0}
                    >
                      <HStack>
                        <Avatar
                          size="sm"
                          name={user?.name}
                          src={user?.profileImage}
                        />
                        <Text display={{ base: 'none', md: 'block' }}>
                          {user?.name}
                        </Text>
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem icon={<FaUser />} onClick={handleProfileClick}>
                        My Profile
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem icon={<FaSignOutAlt />} onClick={logout}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <HStack spacing={2}>
                  <Button
                    as={Link}
                    to="/login"
                    variant="ghost"
                    colorScheme="brand"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    colorScheme="brand"
                  >
                    Sign Up
                  </Button>
                </HStack>
              )}
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
