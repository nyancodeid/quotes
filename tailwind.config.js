module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        '2.2xl': '18px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
