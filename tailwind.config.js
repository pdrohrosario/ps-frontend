/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'dark-gray':'#CECCCC',
        "light-gray": "#d9d9d9"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        }
    },
  },
  plugins: [],
}
