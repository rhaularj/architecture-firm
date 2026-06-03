import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#FAFAF8",
          100: "#F5F4F0",
          200: "#EAE9E4",
          300: "#D4D2CA",
          400: "#AEAC9E",
          500: "#888675",
          600: "#6B6A5A",
          700: "#4D4C3F",
          800: "#2E2D24",
          900: "#1A1A14",
          950: "#0D0D0A",
        },
        gold: {
          100: "#F9F0D9",
          200: "#F0D98A",
          300: "#D4A843",
          400: "#B8892A",
          500: "#9B6E16",
          600: "#7A5210",
        },
        charcoal: {
          DEFAULT: "#1C1C18",
          light: "#2A2A24",
          muted: "#3D3D34",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", ...fontFamily.serif],
        sans: ["var(--font-dm-sans)", ...fontFamily.sans],
        mono: ["var(--font-dm-mono)", ...fontFamily.mono],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.5rem, 8vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 5vw, 5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(1.75rem, 3.5vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.25rem, 2vw, 1.875rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      maxWidth: {
        "prose-lg": "72ch",
        site: "1400px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "gold-line": "goldLine 1.2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        goldLine: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      backgroundImage: {
        noise: "url('/textures/noise.svg')",
        grain: "url('/textures/grain.png')",
        "hero-gradient":
          "linear-gradient(180deg, rgba(28,28,24,0) 0%, rgba(28,28,24,0.85) 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
