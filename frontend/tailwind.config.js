const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}

