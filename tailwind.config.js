const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['Zilla Slab', 'serif'],
    },
    extend: {
      colors: {
        purple: '#3e5eff',
      },
    },
  },

  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
