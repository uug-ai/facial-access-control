/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@uug-ai/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gradientBlue: colors.cyan,
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "1/3": "33.333333%",
        "3/4": "75%",
        full: "100%",
      },
      boxShadow: {
        "inner-right": "inset -5px 0 5px -5px rgba(0, 0, 0, 0.5)", // Adjust values as needed
      },
    },
  },
  plugins: [],
};
