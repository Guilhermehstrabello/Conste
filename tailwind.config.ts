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
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
<<<<<<< HEAD
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
=======
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
>>>>>>> master
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
  },
},
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
