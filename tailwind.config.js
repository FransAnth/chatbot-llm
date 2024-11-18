/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50727B",
        secondary: "#344955",
        dark: "#35374B",
        light: "#78A083",
        warn: "#FF5C5C",
      },
    },
  },
  plugins: [],
};
