/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'tea-green': {
          DEFAULT: '#d0efb1',
          100: '#2a450e',
          200: '#548b1c',
          300: '#7dd02b',
          400: '#a7e16d',
          500: '#d0efb1',
          600: '#daf3c2',
          700: '#e3f6d1',
          800: '#edf9e1',
          900: '#f6fcf0'
        },
        'celadon': {
          DEFAULT: '#b3d89c',
          100: '#213515',
          200: '#436a2a',
          300: '#64a040',
          400: '#8ac367',
          500: '#b3d89c',
          600: '#c2e0b0',
          700: '#d2e7c4',
          800: '#e1efd8',
          900: '#f0f7eb'
        },
        'light-blue': {
          DEFAULT: '#9dc3c2',
          100: '#1b2c2b',
          200: '#355756',
          300: '#508381',
          400: '#71a8a6',
          500: '#9dc3c2',
          600: '#b1cfce',
          700: '#c4dbda',
          800: '#d8e7e6',
          900: '#ebf3f3'
        },
        'air-blue': {
          DEFAULT: '#77a6b6',
          100: '#152327',
          200: '#2a454e',
          300: '#3f6875',
          400: '#548a9c',
          500: '#77a6b6',
          600: '#92b8c4',
          700: '#adcad3',
          800: '#c9dbe2',
          900: '#e4edf0'
        },
        'ucla-blue': {
          DEFAULT: '#4d7298',
          100: '#0f171f',
          200: '#1f2e3d',
          300: '#2e455c',
          400: '#3e5c7a',
          500: '#4d7298',
          600: '#6a8fb4',
          700: '#8fabc7',
          800: '#b4c7d9',
          900: '#dae3ec'
        }
      }
    },
  },
  plugins: [],
};