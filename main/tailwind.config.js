/** @type {import('tailwindcss').Config} */
const { Colors } = require("./constants/Colors");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/index.tsx",
  ],
  presets: [require("nativewind/preset")], // Ensures NativeWind is recognized
  theme: {
    extend: {
      fontFamily: {
        heartful: ["Heartful", "sans-serif"],
      },
      colors: {
        ...Colors.light, // ✅ Normal colors
        ...Object.fromEntries(
          Object.entries(Colors.dark).map(([key, value]) => [
            `dark-${key}`,
            value,
          ])
        ), // ✅ Dark mode colors prefixed properly
      },
    },
  },
  plugins: [],
  darkMode: "class", // ✅ Keep class-based dark mode
};
