const themeColors = {
  primary: '#95e1d3',
  primaryLight: '#bdece3',
  primaryDark: '#6dd6c2',
  primaryText: '#e6e6e6',
  primaryExtraLight: '#e4f7f4',
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: themeColors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
