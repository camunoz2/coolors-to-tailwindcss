/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "300px auto",
      },
    },
  },

  plugins: [],
  safelist: [
    {
      pattern: /bg-/,
    },
  ],
};
