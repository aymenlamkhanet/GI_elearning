module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        "text-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "border-pulse": {
          "0%, 100%": { borderColor: "rgba(255, 255, 255, 0.05)" },
          "50%": { borderColor: "rgba(255, 255, 255, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%": { opacity: 0, transform: "scale(0)" },
          "50%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0)" },
        },
      },
      animation: {
        "text-gradient": "text-gradient 5s ease infinite",
        "border-pulse": "border-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 6s ease-in-out infinite 1.5s",
        sparkle: "sparkle 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
