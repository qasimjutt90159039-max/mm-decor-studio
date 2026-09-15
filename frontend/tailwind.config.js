/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          950: '#0a0105',
          900: '#120309', // Primary dominant base
          800: '#1c0710',
          700: '#260a16',
        },
        burgundy: {
          900: '#241018', // Dark Burgundy
          800: '#331823',
          700: '#462332',
        },
        champagne: {
          300: '#dfcbb1',
          400: '#d4bba0',
          500: '#C9AB81', // Warm Champagne accent
          600: '#b59567',
          700: '#9d7c4f',
        },
        beige: {
          100: '#F7F3EE', // Warm White
          200: '#E9DFD2', // Soft Beige
          300: '#d9cdbe',
        },
        taupe: {
          400: '#a59b95',
          500: '#8C817A', // Muted Taupe
          600: '#736963',
        },
        charcoal: {
          900: '#191415',
          800: '#211B1D', // Charcoal card surface
          700: '#2d2528',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        editorial: '.3em',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
