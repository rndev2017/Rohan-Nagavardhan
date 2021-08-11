module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'none' },
          '15%': { transform: 'translate3d(-20%,0,0) rotate3d(0,0,1,-10deg) translate3d(-20%,0,0) rotate3d(0,0,1,-10deg)' },
          '30%': { transform: 'translate3d(10%,0,0) rotate3d(0,0,1,7deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,7deg)' },
          '45%': { transform: 'translate3d(-15%,0,0) rotate3d(0,0,1,-10deg);transform:translate3d(-15%,0,0) rotate3d(0,0,1,-10deg)' },
          '60%': { transform: 'translate3d(10%,0,0) rotate3d(0,0,1,5deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,5deg)' },
          '75%': { transform: 'translate3d(-5%,0,0) rotate3d(0,0,1,-2deg);transform:translate3d(-5%,0,0) rotate3d(0,0,1,-2deg)' },
          '100%': { transform: 'none' }
        }
      },
      animation: {
        wave: 'wave 1000ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
