/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        paper: "#F8F7F4",
        muted: "#5B6472",
        rule: "#DDDCD5",
        accent: "#1E3A5F",
        "accent-dark": "#15294A",
        "form-bg": "#F3F1EF",
        "form-input": "#F7F6F4",
        "form-input-border": "#D6D3D1",
        "form-heading": "#0B1220",
        "form-label": "#1F2937",
        "form-help": "#4B5563",
        "form-placeholder": "#9CA3AF",
        "accent-soft": "#E6ECF3",
        "stats-bg": "#0F1B2E"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        serif: ["Source Serif 4", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      maxWidth: {
        prose: "62ch",
        page: "1180px"
      },
      letterSpacing: {
        tight2: "-0.02em"
      }
    }
  },
  plugins: []
};
