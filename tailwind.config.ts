import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'extra-wide': '0.2em', // 간격
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'festivalBg': "#FFF7EF"
      },
      keyframes: {
        moveup: {
          '0%': { transform: 'translateY(25px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        movedown: {
          '0%': { transform: 'translateY(-25px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rotate: {
          '0%': {
            transform: 'rotate(0)',
            transformOrigin: 'center'
          },
          '100%': {
            transform: 'rotate(360deg)',
            transformOrigin: 'center'
          }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rotate: 'rotate 0.3s ease-in-out both',
        fadeIn: 'fadeIn 0.6s ease-in-out',
        moveup: 'moveup 0.3s ease forwards',
        movedown: 'movedown 0.3s ease forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
