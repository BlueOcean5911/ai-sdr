import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        space_grotesk: ["var(--font-space-grotesk)", "sans-serif"], // Added fallback font
      },
      colors: {
        "olive-green-900": "#4571B6",
        "olive-green-500": "#668FCE",
        "olive-green-200": "#A5C4F5",
        "olive-green-100": "#D5E2F6",
        "green-100": "#D5E2F6",
        "green-900": "#4571B6",
        "red-100": "#F4E3E3",
        "red-900": "#C56565",
        "gray-150": "#93A3AB",
        "orange-100": "#F4A754",
      },
      backgroundColor: (theme) => theme("colors"), // Removed unnecessary type annotation
      textColor: (theme) => theme("colors"),
      fill: (theme) => theme("colors"),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};

export default config;
