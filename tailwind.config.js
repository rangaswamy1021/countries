/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.red,
        tertiary: colors.yellow,
        quaternary: colors.green,
        quinary: colors.teal,
        senary: colors.pink,
        septenary: colors.purple,
        octonary: colors.gray,
        nonary: colors.gray,
        transparent: 'transparent',
        current: 'currentColor',
        green: colors.emerald,
        red: colors.red,
      }
    },
  },
  plugins: [],
}

