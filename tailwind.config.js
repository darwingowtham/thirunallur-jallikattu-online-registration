/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'thiru-red': '#B91C1C', // Vermillion
        'thiru-gold': '#FACC15', // Turmeric
        'thiru-black': '#09090b', // Zinc 950
        'thiru-glass': 'rgba(0, 0, 0, 0.7)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        tamil: ['"Baloo Thambi 2"', '"Noto Sans Tamil"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(234, 179, 8, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
