/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.css",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brooklyn: ['Brooklyn', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
      fontSize: {
        '8vh': '8vh',
        '6vh': '6vh',
        '4vh': '4vh',
        '3vh': '3vh',
      },
      spacing: {
        'p-margin': '0.5em',
      },
    },
  },
  plugins: [],
}
