/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "spin-reverse": "spin 1s linear infinite reverse",
        "pulse-slow": "pulse 2s ease-in-out infinite",
        "pulse-delay": "pulse 2s ease-in-out infinite 150ms",
        "pulse-delay-long": "pulse 2s ease-in-out infinite 2000ms",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
};