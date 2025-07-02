/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
    "./assets/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { 
          DEFAULT: '#004040', 
          50: '#f0fffe',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#004040',
          700: '#003333',
          800: '#002626',
          900: '#001a1a',
          dark: '#002626', 
          light: '#f0fffe' 
        },
        primary: '#004040',
        secondary: '#26c281',
        accent: { 
          DEFAULT: '#ffb100', 
          dark: '#d99400',
          light: '#fff4e6'
        },
        // Additional green variations for heavy usage
        green: {
          DEFAULT: '#004040',
          50: '#f0fffe',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#004040',
          700: '#003333',
          800: '#002626',
          900: '#001a1a',
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'] 
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 64, 64, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 64, 64, 0)' },
        },
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #004040 0%, #26c281 100%)',
        'gradient-green-light': 'linear-gradient(135deg, #f0fffe 0%, #ccfbf1 100%)',
      }
    },
  },
  plugins: [],
}