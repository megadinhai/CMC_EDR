import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Figma "CMC | EDR" design tokens (Background/*, Stroke/*, Text/*)
        surface: {
          DEFAULT: "#070e18", // Background/Sidebar — page background
          card: "#08101d", // Background/Block — card fill
          border: "rgba(255,255,255,0.15)", // Stroke/Table Stroke
          muted: "rgba(123,123,123,0.2)", // Label/Fill/Grey — bar tracks
        },
        severity: {
          critical: "#ff4e4e",
          high: "#ff6a00",
          medium: "#f6ff00",
          low: "#00cf29",
          information: "#0890dc",
        },
        status: {
          online: "#00cf29",
          offline: "#7b7b7b",
          new: "#0890dc",
          acknowledged: "#00cf29",
          escalated: "#ff4e4e",
          close: "#00cf29",
          "in-progress": "#f6ff00",
          open: "#0890dc",
        },
        tag: {
          "false-positive": "#8f3bb8",
          suspicious: "#0890dc",
          incident: "#c4162a",
        },
        os: {
          windows: "#1f60c4",
          linux: "#7b7b7b",
          centos: "#e0b400",
          redhat: "#0890dc",
          ubuntu: "#8f3bb8",
          other: "#7b7b7b",
        },
        primary: "#0890dc", // Text/Button/Primary — accent used across all single-series charts
      },
      fontFamily: {
        sans: [
          "SVN-Gilroy",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0,0,0,0.3)",
      },
      borderRadius: {
        card: "10px", // Coner/Medium
      },
    },
  },
  plugins: [],
} satisfies Config;
