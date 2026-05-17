
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
        background: {
          DEFAULT: "hsl(var(--bg-primary))",
          secondary: "hsl(var(--bg-secondary))",
          sidebar: "hsl(var(--bg-sidebar))",
          card: "hsl(var(--bg-card))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
          foreground: "hsl(var(--text-on-primary))",
        },
        brand: {
          brown: "hsl(var(--brand-brown))",
          warm: "hsl(var(--brand-warm))",
        },
        text: {
          DEFAULT: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          muted: "hsl(var(--text-muted))",
          "on-primary": "hsl(var(--text-on-primary))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          light: "hsl(var(--border-light))",
        },
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.15)",
        card: "0 4px 16px rgba(0, 0, 0, 0.06)",
        "dark-card": "0 4px 16px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        // Add your fonts here if needed
      },
    },
  },
  plugins: [],
}
