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
      colors: {
        primary: '#05192a',
        secondary: '#ea4138',
        success: '#8bdf84',
        warning: '#dfb984',
        error: '#e29999',
      },
      fontSize: {
        '8vh': '8vh',
        '6vh': '6vh',
        '4vh': '4vh',
        '3vh': '3vh',
        '2vh': '2vh',
      },
      spacing: {
        'p-margin': '0.5em',
      },
    },
  },
  plugins: [],
}
