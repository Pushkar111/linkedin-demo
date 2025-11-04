// client/src/components/Layout.jsx
import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';

/**
 * Layout Component
 * Wraps all pages with consistent navigation and container
 */
const Layout = ({ children }) => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={6}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
