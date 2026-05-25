import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F4E4D7",
        surface: "#E8B89A",
        primary: "#C7765C",
        accent: "#C7765C",
        contrast: "#7A3826",
        ink: "#5A2A1C",
        muted: "rgba(122,56,38,0.65)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        body: ["var(--font-body)", "Figtree", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
