/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans serif'],        
        lexend: ['Lexend', 'sans serif'],
        mulish: ['Mulish', 'sans serif'],
        inter: ['Inter', 'sans serif']
      }
    },
  },
  plugins: [],
}

