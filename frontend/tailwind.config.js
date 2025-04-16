const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(210, 40%, 96%)", // similar to gray-100
        border: "hsl(210, 20%, 85%)", // gray-300
        text: "hsl(220, 10%, 40%)", // gray-600
        textDark: "hsl(220, 13%, 20%)", // gray-800
        placeholder: "hsl(220, 9%, 60%)", // gray-500
        accent: "hsl(217, 91%, 60%)", // blue-600
        accentFocus: "hsl(217, 91%, 65%)", // blue-500
        textMuted: '#6b7280',
        white: "#ffffff",
        instagram: "#e1306c",
        twitter: "#1da1f2",
        facebook: "#1877f2",
        linkedin: "#0077b5",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
