/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Blue
        accent: '#22C55E',  // Green
        warning: '#F59E0B', // Yellow
        danger: '#DC2626',  // Red
        background: '#F3F4F6', // Light Gray
        text: '#374151', // Dark Gray
      },
    },
  },
  plugins: [],
}

