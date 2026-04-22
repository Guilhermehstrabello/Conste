import { keyframes } from "framer-motion";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero_bg': "url('/hero_bg.png')",
      },
      fontFamily: {
        montserrat: ["Figtree", "sans-serif"],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 50s linear infinite',
        TextReveal: 'textReveal 3s ease forwards',
        blogBlob1: 'blogBlob1 7s ease-in-out infinite',
        blogBlob2: 'blogBlob2 8s ease-in-out infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        textReveal: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0% 0' }
        },
        blogBlob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10%, 8%) scale(1.2)' },
          '50%': { transform: 'translate(4%, -6%) scale(0.95)' },
          '75%': { transform: 'translate(-8%, 5%) scale(1.05)' },
        },
        blogBlob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '20%': { transform: 'translate(-12%, -6%) scale(1.05)' },
          '40%': { transform: 'translate(6%, 12%) scale(0.9)' },
          '60%': { transform: 'translate(10%, -10%) scale(1.1)' },
          '80%': { transform: 'translate(-5%, 8%) scale(1)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
