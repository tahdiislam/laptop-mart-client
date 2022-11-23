/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: [
          {
            mytheme: {
              primary: "#14CC60",
              secondary: "#285430",
              accent: "#092F1C",
              neutral: "#010E18",
              "base-100": "#ffffff",
            },
          },
          "emerald",
        ],
      },
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
  };  