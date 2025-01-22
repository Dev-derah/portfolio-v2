import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          900: "#0F172A", // Deep Navy - for main text and important elements
          800: "#1E293B", // Rich Navy - for secondary text
          700: "#334155", // Muted Navy - for subtle elements
        },

        // Accent Colors
        accent: {
          DEFAULT: "#FF4B00", // Vibrant Orange - for hover states and highlights
          light: "#FF6B3D", // Light Orange - for secondary interactions
          dark: "#CC3C00", // Dark Orange - for active states
        },

        // Neutral Colors
        neutral: {
          50: "#FAFAFA", // Almost White - background
          100: "#F4F4F5", // Light Gray - subtle backgrounds
          200: "#E4E4E7", // Lighter Gray - borders
          300: "#D4D4D8", // Medium Gray - disabled states
          400: "#A1A1AA", // Dark Gray - placeholder text
        },

        // Gold Accents
        gold: {
          light: "#FFF1D4", // Light Gold - subtle highlights
          DEFAULT: "#CFB53B", // Classic Gold - luxury accents
          dark: "#B89B2D", // Dark Gold - interactive elements
        },

        // Video Overlay
        overlay: {
          light: "rgba(15, 23, 42, 0.7)", // Semi-transparent navy
          dark: "rgba(15, 23, 42, 0.9)", // Darker overlay
        },

        // Gradient Definitions
        gradients: {
          primary: "linear-gradient(to right, #0F172A, #334155)",
          accent: "linear-gradient(45deg, #FF4B00, #FF6B3D)",
          gold: "linear-gradient(to right, #CFB53B, #B89B2D)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
