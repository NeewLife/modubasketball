const Scroll = require('tailwind-scrollbar');

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      brand: {
        10: '#F8B099',
        20: '#EE805D',
        30: '#EE5626',
        40: '#B54521',
        50: '#561D0B',
      },
      secondary: {
        10: '#ADEBE8',
        20: '#41A6A1',
        30: '#238C87',
        40: '#1A5F51',
        50: '#003427',
      },
      gray: {
        10: '#FFFFFF',
        20: '#F1F1F1',
        30: '#EAEAEA',
        40: '#DBDBDB',
        50: '#C5C5C5',
        60: '#A6A6A6',
        70: '#7C7C7C',
        80: '#5D5D5D',
        90: '#3F3F3F',
        100: '#1A1A1A',
      },
    },
    screens: {
      desktop: [{
          min: '1025px',
      }],
      tablet: [{
        min: '481px',
        max: '1024px'
      }],
      mobile: [{ 
        min: '0px', 
        max: '480px' 
      }],
    },
  },

  plugins: [Scroll],
};
