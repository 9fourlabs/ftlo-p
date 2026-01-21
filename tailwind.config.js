/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f7',
          100: '#d9e0eb',
          200: '#b3c1d6',
          300: '#8da2c2',
          400: '#6783ad',
          500: '#416499',
          600: '#34507a',
          700: '#273c5c',
          800: '#1a2744',
          900: '#0d1322',
        },
        cream: {
          50: '#fefdfb',
          100: '#fcfaf6',
          200: '#f8f6f1',
          300: '#f0ebe0',
          400: '#e5dcc9',
          500: '#d4c9ad',
        },
        gold: {
          300: '#e0c98a',
          400: '#d4b76f',
          500: '#c9a962',
          600: '#b08d3e',
        },
        rose: {
          300: '#e5c4c4',
          400: '#d4a5a5',
          500: '#c48686',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}