/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,scss}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          50: "#4B5076",
          100: "#414566",
          200: "#373B57",
          300: "#3C405F",
          400: "#353853",
          500: "#2D3047",
          600: "#25283B",
          700: "#232537",
          800: "#1E202F",
          900: "#191B28",
          950: "#0F1018",
          DEFAULT: "#2D3047",
        },
        secondary: {
          50: "#ffffff",
          100: "#fcf9f5",
          200: "#faf7f2",
          300: "#f9f6f1",
          400: "#fbf6f0",
          500: "#F7ECE1",
          600: "#f2dfcd",
          700: "#f3e2d2",
          800: "#efd8c2",
          900: "#ecd3b9",
          950: "#e7c6a5",
          DEFAULT: "#F7ECE1",
        },
        tertiary: { DEFAULT: "#373B57" },
        accent: { DEFAULT: "#586a6a" },
        gray: { DEFAULT: "#928E94" },
        red: { DEFAULT: "#8B2635" },
        green: { DEFAULT: "#65B891" },
        blue: { DEFAULT: "#6883BA" },
        cyan: { DEFAULT: "#38A3A6" },
      },
    },
  },
  plugins: [],
};

/*
 * rgba(244, 215, 214, 211)
 *
 * */
