/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // TFL Official Colors
        'tfl-blue': '#0019A8',
        'tfl-red': '#DC241F',
        circle: {
          DEFAULT: '#FFD300',
          dark: '#E6BE00',
        },
        bakerloo: {
          DEFAULT: '#B36305',
          dark: '#8F4F04',
        },
        district: {
          DEFAULT: '#00782A',
          dark: '#005A1F',
        },
        central: {
          DEFAULT: '#E32017',
          dark: '#C71C0C',
        },
        northern: {
          DEFAULT: '#000000',
          dark: '#333333',
        },
        piccadilly: {
          DEFAULT: '#003688',
          dark: '#002455',
        },
        victoria: {
          DEFAULT: '#0098D4',
          dark: '#0077AA',
        },
        jubilee: {
          DEFAULT: '#A0A5A9',
          dark: '#7D8387',
        },
        metropolitan: {
          DEFAULT: '#9B0056',
          dark: '#7A0044',
        },
        'hammersmith-city': {
          DEFAULT: '#F3A9BB',
          dark: '#E088A1',
        },
        'waterloo-city': {
          DEFAULT: '#95CDBA',
          dark: '#7AB8A3',
        },
        elizabeth: {
          DEFAULT: '#7156A5',
          dark: '#5A4382',
        },
        // UI Colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};