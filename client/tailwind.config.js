/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      darkColor: "#272343",
      lightDark: "#394867",
      pinkColor: "#FF0063",
      tealColor: "#66BFBF",
      lightTealColor: "#BAE8E8",
      darkTeal: "#00587A",
      darkerTeal: "#204051",
      whiteColor: "#fff",
      grayColor: "#EEEEEE",
    },
    extend: {},
  },
  plugins: [],
};
