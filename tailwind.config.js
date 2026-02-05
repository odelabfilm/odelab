/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ode-navy": "#050A18",
        "ode-white": "#F5F5F5",
        "ode-gray": "#888888",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        mono: ["Courier Prime", "monospace"],
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
