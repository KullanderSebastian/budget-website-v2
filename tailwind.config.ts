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
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        customBlue: {
          900: '#160361',
          700: '#003a92',
          500: '#0065b3',
          300: '#008ec2',
          100: '#00b7c4',
        },
        headerGray: "#1F2937",
        textGray: "#4B5563", 
      },
    },
  },
  plugins: [],
} satisfies Config;
