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
        background: "#0D0F2B",
        surface: "#12154A",
        panel: "#1B204F",
        primary: {
          DEFAULT: "#4FC3F7",
          foreground: "#0F172A",
        },
        accent: {
          DEFAULT: "#5C6BC0",
          foreground: "#EFF6FF",
        },
        muted: "#94A3B8",
        success: "#34D399",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.15)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
}
