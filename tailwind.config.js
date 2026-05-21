/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#161616",
        line: "#1f1f1f",
        "line-soft": "#181818",
        muted: "#6b6b6b",
        foreground: "#e8e8e8",
        crimson: "#dc2626",
        "crimson-bright": "#ef4444",
        gold: "#d4af37",
        "gold-bright": "#f4cf57",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
