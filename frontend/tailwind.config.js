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
        bg: "hsl(140, 30%, 20%)", // Dark green background
        border: "hsl(140, 20%, 35%)", // Dark green for border (lighter)
        title: "hsl(0, 0.00%, 0.00%)",
        text: "hsl(140, 15%, 80%)", // Lighter dark green text for better readability
        textDark: "hsl(140, 13%, 10%)", // Dark green text (for dark mode)
        placeholder: "hsl(140, 10%, 40%)", // Dark green for placeholder
        accent: "hsl(140, 50%, 55%)", // Dark green accent
        accentFocus: "hsl(140, 50%, 60%)", // Lighter dark green accent on focus
        textMuted: "#4b5d4b", // Muted dark green text
        white: "#ffffff",

        // Social media colors
        instagram: "#f08d68", // Slight contrast for Instagram
        twitter: "#00bfae", // Slight contrast for Twitter
        facebook: "#1877f2", // Facebook's official blue color
        linkedin: "#0077b5", // LinkedIn's blue for contrast

        // Footer-specific (using a deep green)
        deepgreen: "#2a5d4d",
        footerBg: "#2a5d4d", // Dark green for footer
        wave: "#2a5d4d", // Wave color
        footerText: "#ffffff", // White text for footer

        // Button colors (slightly lighter dark green background for buttons)
        buttonBg: "hsl(140, 40%, 30%)", // A slightly lighter dark green background for buttons
        buttonText: "hsl(140, 50%, 90%)", // Lighter text color on buttons (for contrast)

        // Footer credit text color (lighter green for credit text)
        footerCreditText: "hsl(140, 40%, 60%)", // Light green for copyright text

        // Navigation bar colors
        navBarBg: "#2a5d4d", // Dark green background for nav bar
        navBarText: "hsl(140, 40%, 75%)", // Lighter text color for nav bar

        // Updated intro-card color to align with theme
        'intro-card': 'hsl(140, 25%, 95%)', // Lighter, muted green for the card background
      },
      boxShadow: {
        'card': '0 6px 12px rgba(0, 0, 0, 0.15)', // Deeper shadow for the card
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
