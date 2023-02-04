/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "arrow-bounce": {
          "0%, 100%": {
            transform: "translateY(50%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "50%": {
            transform: "translateY(25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        "arrow-bounce": "arrow-bounce 1s linear infinite",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
  daisyui: {
    themes: false,
  },
};