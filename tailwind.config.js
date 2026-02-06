/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rs: {
          gold: '#c9aa58',
          'gold-light': '#e5c96e',
          'gold-dark': '#a68a3a',
          brown: '#3e3529',
          'brown-light': '#5c4d3c',
          'brown-dark': '#2a241c',
          tan: '#b09969',
          parchment: '#d4c4a0',
          green: '#3d6b35',
          'green-light': '#5a9c4f',
          red: '#8b2020',
          dark: '#1c1810',
          darker: '#13110c',
          border: '#4a4035',
        }
      },
      fontFamily: {
        runescape: ['Cinzel', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'rs': 'inset 0 1px 0 rgba(201, 170, 88, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
        'rs-hover': 'inset 0 1px 0 rgba(201, 170, 88, 0.5), 0 4px 8px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
