/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Konkhmer: ["Konkhmer Sleokchher", "system-ui"],
        robo: ["Roboto", "sans-serif"],
      },
      colors: {
        darkbg: "#272829",
        bg: "#f5f5f5",
        head: "#272829",
        darkhead: "#f5f5f5",
        text: "#2C3333",
        darktext: "#E8E2E2",
      },
      screens: {
        sm: "640px",
        md: "1000px",
      },
    },
  },
  plugins: [],
};
