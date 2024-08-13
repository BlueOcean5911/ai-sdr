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
        "olive-green-900": "#8B9373",
        "olive-green-500": "#B3B8A5",
        "olive-green-200": "#D9DFC7",
        "olive-green-100": "#E4E6DE",
        "green-100": "#E3F4E3",
        "green-900": "#65C565",
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
  plugins: [
    require("@tailwindcss/forms"), // Ensure the plugin is installed
  ],
};

export default config;
