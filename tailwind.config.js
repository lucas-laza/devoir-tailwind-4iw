/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'petrol': {
          '50': '#f5f6fa',
          '100': '#ebedf3',
          '200': '#d2d7e5',
          '300': '#abb6ce',
          '400': '#7e8eb2',
          '500': '#5e7099',
          '600': '#4a597f',
          '700': '#3c4768',
          '800': '#353e57',
          '900': '#32394e',
          '950': '#202331',
        },
        'orange': {
          '50': '#fefaec',
          '100': '#fceec9',
          '200': '#f9d67b',
          '300': '#f7c352',
          '400': '#f5ac2a',
          '500': '#ef8b11',
          '600': '#d3680c',
          '700': '#af470e',
          '800': '#8e3712',
          '900': '#752e12',
          '950': '#431605',
        },
    
      }
    },
  },
  plugins: [],
}