/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        brand: {
          50:  '#f6fbf8',
          100: '#eaf7ee',
          200: '#cfeedd',
          300: '#b3e4cc',
          400: '#8fd8b0',
          500: '#66c28a',
          600: '#2e8b56',
          700: '#1f5f3b',
          800: '#123d28',
          900: '#092617',
        },
        mint: {
          50:  '#f2fdf6',
          100: '#e0faec',
          200: '#c0f4d8',
        }
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(22,163,74,0.08)',
        'card-hover': '0 8px 40px rgba(22,163,74,0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
