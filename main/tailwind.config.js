/** @type {import('tailwindcss').Config} */
const { Colors } = require("./constants/Colors");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/index.tsx",
  ],
  presets: [require("nativewind/preset")], // Ensures NativeWind is recognized
  theme: {
    extend: {
      fontFamily: {
        heartful: ["Heartful", "sans-serif"],
      },
      colors: {
        ...Colors.light,
        ...Object.fromEntries(
          Object.entries(Colors.dark).map(([key, value]) => [
            `dark-${key}`,
            value,
          ])
        ),
      },
      backgroundImage: {
        "main-pattern": "url('/assets/images/main.png')",
      },
    },
  },
  plugins: [],
};
