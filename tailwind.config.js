/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004A99', // Professional Blue
          dark: '#003366',
          light: '#3377CC',
        },
        accent: {
          DEFAULT: '#FF8C00', // Energetic Orange
          dark: '#E67E00',
          light: '#FFA500',
        },
        background: '#F8FAFC',
        foreground: '#1E293B',
      },
    },
  },
  plugins: [],
}
