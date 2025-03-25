/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          primary: '#00A6FB',    // Bright blue
          secondary: '#0582CA',  // Deep blue
          accent: '#006494',     // Dark blue
          highlight: '#51D6FF',  // Light blue
          dark: '#003554',       // Navy
          light: '#E6F6FF',      // Ice blue
          warning: '#FF8E3C',    // Orange
          success: '#2ECC71',    // Green
          error: '#E74C3C',      // Red
        }
      },
      animation: {
        'grid-fade': 'grid-fade 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'grid-fade': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
} 