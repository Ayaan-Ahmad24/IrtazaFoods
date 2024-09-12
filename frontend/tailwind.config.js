/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '11rem': '11rem',
        '11.5rem': '11.5rem',
      },
    },
  },
  plugins: [],
}