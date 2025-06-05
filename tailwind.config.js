/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        fratSilver: "#C0C0C0",
        fratBlack: "#000000",
      },
    },
  },
  plugins: [],
};