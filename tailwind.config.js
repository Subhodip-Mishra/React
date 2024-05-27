/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
export default {
  content: [], content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      spotlight: "spotlight 2s ease .75s 1 forwards",
    },
    keyframes: {
      spotlight: {
        "0%": {
          opacity: 0,
          transform: "translate(-72%, -62%) scale(0.5)",
        },
        "100%": {
          opacity: 1,
          transform: "translate(-50%,-40%) scale(1)",
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}

