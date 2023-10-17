/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#F6EEE3",
        off_white: "#FAF9F6",
        dark_blue: "#2B35AF",
        blue: "#4361EE",
        light_blue: "#4895EF",
      },
    },
  },
  plugins: [],
};
