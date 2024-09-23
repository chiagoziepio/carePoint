/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-bg-color': '#334f38', 
        'bg-banner' : '#70cca1',
        'bg-light' : '#EAEFFF'
      },
      textColor:{
        'primary-color' : '#334f37'
      }
    },
  },
  plugins: [],
};
