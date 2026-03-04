/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#d4453b',
          dark: '#c73c32',
        },
        navy: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d35',
        },
        charcoal: '#2d2d35',
        cream: '#faf8f5',
        'warm-bg': '#f3ede4',
        gold: '#c9a961',
        teal: '#42BFCD',
        muted: '#5a5a66',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '18px',
      },
    },
  },
  plugins: [],
};
