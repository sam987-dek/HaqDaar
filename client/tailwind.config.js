/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Black and white, like a lawyer's robe and bands. Token names are kept from the first theme
        // so every page picks these up; colour is kept only for status (warn, success, error).
        frost: '#F7F7F5',
        mist: '#ECECE8',
        ink: { DEFAULT: '#0A0A0A', soft: '#262626' },
        midnight: { DEFAULT: '#050505', 800: '#111111', 700: '#1C1C1C' },
        steel: '#62625E',
        line: '#E2E2DE',
        glacier: { 100: '#EDEDEA', 300: '#BDBDB8', 500: '#3A3A3A', 700: '#111111' },
        silver: '#C9C9C4',
        marigold: '#B7791F',
        emerald: '#17663F',
        crimson: '#B42318',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 1px 0 rgba(255,255,255,.6) inset, 0 20px 50px -24px rgba(0,0,0,.3)',
        glow: '0 0 0 1px rgba(255,255,255,.1), 0 24px 60px -24px rgba(0,0,0,.6)',
        lift: '0 24px 60px -30px rgba(0,0,0,.35)',
      },
      borderRadius: { panel: '28px' },
    },
  },
  plugins: [],
};
