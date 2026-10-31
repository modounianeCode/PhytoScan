/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        phyto: {
          dark: '#0e4a3b',       // Vert sombre principal (headers, boutons)
          primary: '#10564F',    // Vert foncé élégant
          accent: '#10B981',     // Vert vif émeraude
          light: '#EAF7EE',      // Vert très pâle pour fonds de cartes
          border: '#D1E7DD',
          warning: '#F59E0B',
          warningLight: '#FEF3C7',
          danger: '#EF4444',
          dangerLight: '#FEE2E2',
          surface: '#F8FAF9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
