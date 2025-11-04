/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
}
