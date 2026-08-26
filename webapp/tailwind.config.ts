import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EE",
        blush: "#F3DED6",
        petal: "#E8B4A8",
        terracotta: "#C1663F",
        sage: "#8FA080",
        charcoal: "#2E2A26",
        ink: "#3D372F",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(46, 42, 38, 0.25)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
