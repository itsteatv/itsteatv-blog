/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a", "950": "#020617" }
      },
      screens: {
        ">=400px": { "min": "9.375em", "max": "25em" },
        ">=970px": { "min": "60.625em" },
        ">=960px": { "max": "60em" },
        ">=990px": { "max": "61.875em" },
      },
      fontFamily: {
        "SourceCodePro": ['Source Code Pro', 'monospace'],
        "SometypeMono": ['Sometype Mono', 'monospace']
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}