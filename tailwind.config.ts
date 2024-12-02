import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif']
      },
      backgroundImage: {
        "auth-gradient": "linear-gradient(90deg, rgba(227,215,251,1) 0%, rgba(246,242,254,1) 32%)"
      },
      colors: {
        customPurple: {
          1300: "#5D37E6",
          1100: "#7B5CEB",
          900: "#9880EF",
          700: "#BBA4F5",
          500: "#DBC9FC",
          300: "#E3D7FB",
          100: "#F6F2FE",
        },
        complementary: {
          DEFAULT: "#C0E637"
        },
        errorRed: '#E63946',
        headerGray: "#1F2937",
        textGray: "#4B5563", 
      },
    },
  },
  plugins: [],
} satisfies Config;
