import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Pages/**/*.{js,ts,jsx,tsx,mdx}", // Note: Ensure this matches your file structure (case-sensitive)
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
