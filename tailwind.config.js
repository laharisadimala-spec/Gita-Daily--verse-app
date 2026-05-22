/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          150: '#F7F1E5',
          200: '#F3EAD8',
          300: '#E6D5B8',
          350: '#DCCBA8',
          400: '#D4BE9B',
          405: '#C9B08A',
          450: '#BDA37E',
          455: '#B39873',
          900: '#2A241E',
          950: '#1F1A15',
        },
        saffron: {
          50: '#FFF9F5',
          100: '#FFEFE5',
          200: '#FFD7C2',
          500: '#D95D24',
          550: '#CE5220',
          600: '#C24D1C',
          650: '#B34418',
          700: '#A13C12',
          750: '#8F3410',
          800: '#7F2F0E',
          850: '#6B2709',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF9EB',
          200: '#FCEFC7',
          300: '#F5DF9E',
          400: '#E6B84D',
          450: '#D4A83D',
          500: '#C59B27',
          600: '#A07D1C',
          800: '#705514',
        },
        red: {
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          400: '#FA5252',
          550: '#E03131',
          650: '#C92A2A',
          700: '#B52828',
        },
        green: {
          50: '#F0FFF4',
          400: '#51CF66',
          650: '#2F9E44',
          800: '#237032',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'spiritual': '0 10px 30px -15px rgba(217, 93, 36, 0.15)',
        'spiritual-lg': '0 20px 40px -20px rgba(217, 93, 36, 0.25)',
        'gold-glow': '0 0 15px rgba(230, 184, 77, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
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
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
