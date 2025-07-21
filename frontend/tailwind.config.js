/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mona: ['"Mona Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}