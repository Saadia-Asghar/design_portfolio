import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        paper: "#F6F1E7",
        ink: "#1A1A1A",
        blush: "#E9C6B5",
        sage: "#A8B5A0",
        gold: "#C8A24B",
        cream: "#FBF7EE",
      },
      boxShadow: {
        page: "0 30px 60px -20px rgba(0,0,0,0.25), 0 15px 30px -15px rgba(0,0,0,0.15)",
        card: "0 20px 40px -20px rgba(0,0,0,0.2), 0 10px 20px -10px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at top left, rgba(201,162,75,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(233,198,181,0.15) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
