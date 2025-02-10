/** @type {import('tailwindcss').Config} */

const pxToRem = require('tailwindcss-preset-px-to-rem');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-1': '#FFFFFF',
        'gray-2': '#FAFAFA',
        'gray-3': '#F5F5F5',
        'gray-4': '#F0F0F0',
        'gray-5': '#D9D9D9',
        'gray-6': '#BFBFBF',
        'gray-7': '#8C8C8C',
        'gray-8': '#595959',
        'gray-9': '#434343',
        'gray-10': '#262626',
        'gray-11': '#1f1f1f',
        'gray-12': '#141414',
        'gray-13': '#000000',
        'primary-0': '#FF7900',
        'primary-1': '#FF9429',
        'primary-2': '#FFAE52',
        'primary-3': '#FFC67A',
        'primary-4': '#FFDAA3',
        'primary-5': '#FFF6E6',
        'sub-accent-1': '#00A7E1',
        'sub-accent-2': '#4BC6DE',
        'sub-accent-3': '#73D7EA',
        'sub-accent-4': '#A6E9F5',
      },
      // 박스 쉐도우
      boxShadow: {
        '2md': '0 3px 20px -3px rgb(127 127 127 / 30%);',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
  presets: [pxToRem],
};
