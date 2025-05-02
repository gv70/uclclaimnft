import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary blu-viola per CTA
        primary: {
          DEFAULT: "#4f46e5",
          light: "#6366f1",
          dark: "#4338ca",
        },
        // secondary / accent giallo-oro per highlights
        secondary: "#facc15",
      },
      fontFamily: {
        // Heading con Inter
        heading: ["Inter", "sans-serif"],
        // Body con Open Sans
        body: ['"Open Sans"', "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
