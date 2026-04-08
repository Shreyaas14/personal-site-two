/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-general-sans)', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        styrene: ['var(--font-space-grotesk)', 'Space Grotesk', 'Inter', 'sans-serif'],
        gemini: ['var(--font-dm-sans)', 'DM Sans', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        earth: {
          900: '#2a2420',
          800: '#3d3530',
          700: '#504540',
          600: '#6b5d55',
          500: '#8a7a70',
        },
        cream: {
          100: '#d4c8b8',
          200: '#c4b8a8',
          300: '#b0a090',
          400: '#8a7a6a',
        },
        parchment: {
          DEFAULT: '#d4c8b8',
          light: '#e0d5c5',
          dark: '#c0b4a4',
        },
        ink: {
          DEFAULT: '#2a2420',
          light: '#4a4035',
          faded: '#6b5d50',
        },
        gold: {
          DEFAULT: '#B0903D',
          light: '#c9a855',
          dark: '#8a7030',
          aged: '#986335',
        },
        oxblood: {
          DEFAULT: '#4a2028',
          light: '#5c2a34',
        },
        patina: {
          DEFAULT: '#5c6b5c',
          light: '#6b7a6b',
        },
      },
    },
  },
  plugins: [],
};