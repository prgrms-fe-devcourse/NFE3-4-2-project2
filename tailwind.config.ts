import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // 전체 소스 파일 경로 포함
  ],
  theme: {
    extend: {
      fontFamily:{
        tilt:["Tilt Warp", "san-serif"]
      }
    },
  },
  plugins: [
        plugin(function ({ addBase, theme }) {
      const colors = theme("colors");

      const variables = Object.keys(colors).reduce((acc, key) => {
        if (typeof colors[key] === "string") {
          acc[`--${key}`] = colors[key];
        } else {
          Object.keys(colors[key]).forEach((shade) => {
            acc[`--${key}-${shade}`] = colors[key][shade];
          });
        }
        return acc;
      }, {});

      addBase({
        ":root": variables,
      });
    }),
  ],
};
