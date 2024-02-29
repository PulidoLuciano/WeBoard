/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        "14": "repeat(14, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))"
      },
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

