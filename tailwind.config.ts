// tailwind.config.ts
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
        primary: {
          DEFAULT: '#4f46e5',      // blu-viola per call-to-action
          light:   '#6366f1',
          dark:    '#4338ca',
        },
        accent:  '#facc15',        // giallo-oro per highlights
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body:    ['"Open Sans"', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.5rem',              // bottoni/contorni più arrotondati
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
