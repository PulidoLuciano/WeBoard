/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation:{
        'card-pass': 'cardPass 0.25s linear infinite'
      },
      keyframes:{
        cardPass: {
          '0%':{
            transformOrigin: 'bottom left ',
            zIndex: '20',
          },
          '50%': {
            transform: 'translate(250px) rotate(15deg)',
          },
          '70%':{
            zIndex: '0'
          },
          '100%':{
            transform: 'rotate(0deg)',
            transform: 'translate(0px)'
          }
        }
      }
    },
  },
  plugins: [],
}

