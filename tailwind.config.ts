import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "drip-sauce": "#E88D2A",
        "drip-sauce-light": "#F5A623",
        "drip-sauce-dark": "#C76D1A",
        "drip-cream": "#FFF5E6",
        "drip-charcoal": "#1C1917",
        "drip-black": "#0C0A09",
        "drip-spicy": "#DC2626",
        "drip-herb": "#22C55E",
        "drip-muted": "#A8A29E",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;