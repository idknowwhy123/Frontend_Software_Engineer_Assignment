module.exports = {
  theme: {
    extend: {
      colors: {
        airline: {
          50: "#EAF3F8",
          DEFAULT: "#0F4C81",
          700: "#0B3B63",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 300ms ease-out both",
      },
    },
  },
};
