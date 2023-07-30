const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Lato']
      },
      colors: {
        'primary': '#1d9bf0',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

