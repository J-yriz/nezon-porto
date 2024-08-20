import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "liteLightBlue": "#E1F7F5",
        "lightBlue": "#9AC8CD",
        "blueCus": "#0E46A3",
        "darkBlue": "#1E0342",
      },
    },
  },
  plugins: [],
};
export default config;
