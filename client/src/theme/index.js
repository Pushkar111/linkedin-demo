// client/src/theme/index.js
import { extendTheme } from '@chakra-ui/react';

/**
 * Chakra UI theme customization
 * Defines custom colors, fonts, and component styles
 */
const theme = extendTheme({
  colors: {
    linkedin: {
      50: '#e8f4fd',
      100: '#b8dffb',
      200: '#88cbf9',
      300: '#58b6f7',
      400: '#28a2f5',
      500: '#0a66c2',
      600: '#08519b',
      700: '#063d74',
      800: '#04284d',
      900: '#021426',
    },
    brand: {
      50: '#e8f4fd',
      100: '#b8dffb',
      200: '#88cbf9',
      300: '#58b6f7',
      400: '#28a2f5',
      500: '#0a66c2',
      600: '#08519b',
      700: '#063d74',
      800: '#04284d',
      900: '#021426',
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif`,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;
