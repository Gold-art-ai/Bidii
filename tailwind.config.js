/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maestro-bg': '#F9F6F0',
        'maestro-dark': '#1A1C1A',
        'maestro-accent': '#D4C4A8',
        'maestro-muted': '#6B6E6B',
      },
      fontFamily: {
        serif: ['"PP Editorial New"', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
