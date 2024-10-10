/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: Array.from({ length: 1920 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    extend: {},
  },
  plugins: [],
}
