/** @type {import('tailwindcss').Config} */ 
module.exports = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      darkColor : '#272343',
      pinkColor: "#FF0063",
      tealColor: "#66BFBF",
      lightTealColor:"#BAE8E8",
      whiteColor:"#fff"
    },
    extend: {},
  },
  plugins: [],
}