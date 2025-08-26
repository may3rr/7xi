/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 七夕主题配色 - 温暖浪漫的配色方案
        primary: {
          50: '#fef7f0',
          100: '#fde8d7',
          200: '#fbd0ae',
          300: '#f8b085',
          400: '#f59e72',
          500: '#f08b5b',
          600: '#e8744a',
          700: '#d85d39',
          800: '#c14d2e',
          900: '#a63e25',
        },
        secondary: {
          50: '#fff9f5',
          100: '#fef2eb',
          200: '#fce4d6',
          300: '#fad5c1',
          400: '#f8c6ac',
          500: '#f6b797',
          600: '#f4a882',
          700: '#f2996d',
          800: '#f08a58',
          900: '#ee7b43',
        },
        // 稀有度颜色
        rarity: {
          ssr: '#ffd700', // 金色
          sr: '#c470d3',  // 紫色
          r: '#4a90e2',   // 蓝色
          n: '#6b7280',   // 灰色
        },
        // 背景渐变色
        bg: {
          start: '#fff5f5',
          middle: '#fef2f2',
          end: '#fdf2f8',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'golden-glow': 'goldenGlow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'rainbow': 'rainbow 3s ease-in-out infinite',
      },
      keyframes: {
        cardFlip: {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        goldenGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.3)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-qixi': 'linear-gradient(135deg, #fff5f5 0%, #fef2f2 50%, #fdf2f8 100%)',
        'gradient-card-ssr': 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
        'gradient-card-sr': 'linear-gradient(135deg, #c470d3 0%, #d084dc 50%, #c470d3 100%)',
        'gradient-card-r': 'linear-gradient(135deg, #4a90e2 0%, #6ba3f0 50%, #4a90e2 100%)',
        'gradient-card-n': 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)',
      }
    },
  },
  plugins: [],
};