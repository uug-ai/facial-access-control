/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "1/3": "33.333333%",
        "3/4": "75%",
        full: "100%",
      },
    },
  },
  plugins: [],
}

