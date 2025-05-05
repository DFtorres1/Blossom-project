/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EEE3FF",
          600: "#8054C7",
          700: "#5A3696",
        },
        secondary: {
          600: "#63D838",
        },
        whiteSmoke: "#FAFAFA",
        softGray: "#FFFEFE",
        coolGray: {
          100: "#F3F4F6",
        },
      },
      textColor: {
        primary: "#1F2937",
        secondary: "#6B7280",
        dark: "#111827",
        starred: "#63D838",
        primaryBlue: "#8054C7"
      },
    },
  },
  plugins: [],
};
