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
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "pulse-delay": "pulse-delay 2s ease-in-out infinite",
        "pulse-delay-long": "pulse-delay-long 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-delay-long": "float 6s ease-in-out infinite 4s",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "pulse-delay": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" },
        },
        "pulse-delay-long": {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.4" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.7",
          },
          "33%": {
            transform: "translateY(-10px) rotate(120deg)",
            opacity: "1",
          },
          "66%": {
            transform: "translateY(5px) rotate(240deg)",
            opacity: "0.8",
          },
        },
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.1)",
          },
          "100%": {
            boxShadow:
              "0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.1)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient": "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(255, 255, 255, 0.1)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.3)",
      },
    },
  },
  plugins: [],
};
