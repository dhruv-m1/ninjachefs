/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      'ninja-blue': '#171A29',
      'chefs-blue': '#2B7CD3'
    },
    fontFamily: {
      'poppins': 'Poppins',
    },
    boxShadow: {
      'ninja': '0px 0px 15px rgba(0, 0, 0, 0.12)',
      'chef': '0px 0px 10px rgba(0, 0, 0, 0.12)',
    }
  },
  },
  plugins: [require("@tailwindcss/forms")],
}

