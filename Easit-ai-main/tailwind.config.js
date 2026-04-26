/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#3B82F6',
        'brand-purple': '#8B5CF6',
        'deep-black': '#050505',
        'neon-cyan': '#00F0FF',
      },
      animation: {
        'slide-up-fade-in': 'slide-up-fade-in 0.4s ease-out forwards',
      },
      keyframes: {
        'slide-up-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
