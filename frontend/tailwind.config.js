/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  /* All Tailwind “font-*” utilities below now resolve to Cormorant Garamond */
  sans:   ["var(--font-cormorant)", "serif"],
  serif:  ["var(--font-cormorant)", "serif"],
  mono:   ["var(--font-cormorant)", "serif"],   // only needed if you’d previously forced mono → Cinzel

  /* Custom aliases you’ve used elsewhere */
  primary: ["var(--font-cormorant)", "serif"],
  geist:   ["var(--font-cormorant)", "serif"],  // covers legacy `font-geist` classes
  /* …add any other aliases you want to remap */
},
       keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    
      colors: {
        primary:  "#002855",
        accent:   "#0094FF",
        greenish: "#36B37E",
      },
      fontFamily: {
        display: ["'Inter Tight'", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        sharetech: ["var(--font-sharetech)", "monospace"],
      },
    },
  },
  plugins: [],
};
