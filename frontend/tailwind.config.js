/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
         poppins: ["Poppins"],
         inter: ["Inter"],
         playfair: ["Playfair Display"],
         opensans: ["Open Sans"],
         roboto: ["Roboto"],
      },
       keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease',
        'slide-in-right': 'slide-in-right 0.5s ease',
      },
    },
  },
  plugins: [],
};
