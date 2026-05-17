/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F4EF",
        surface: "#FFFFFF",
        panel: "#4A5C2A",
        primary: {
          DEFAULT: "#7D8263",
          foreground: "#FFFFFF",
          dark: "#6B6F55",
          light: "#9A9F81",
        },
        accent: {
          DEFAULT: "#8B6914",
          foreground: "#FFFFFF",
        },
        brand: {
          brown: "#6B4C2A",
          warm: "#8B6914",
        },
        muted: "#6B7280",
        success: "#4A7C3F",
        warning: "#D97706",
        danger: "#DC2626",
        info: "#2563EB",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
        card: "0 4px 16px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
}
