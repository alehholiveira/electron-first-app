/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', './src/renderer/index.html'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'fundo': "url('/srr/assets/fundo.jpg')",
      })
    }
  },
  plugins: []
}