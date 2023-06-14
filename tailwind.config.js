/** @type {import('tailwindcss').Config} */
import { DefaultColors } from 'tailwindcss/types/generated/colors'
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#00E03A",
        primary_dark: "#00cb35",
        secondary: "#E000A6",
        blue_white: "#EBF9FF",
        green_white: "#EDFFF2",
        purple_white: "#F7F6FF"
      },
      boxShadow:{
        user: "0 0 2px 2px rgba(0,0,0,0.7)",
      }
    },
  },
  variants:{
    extend: {
      // transform: ['hover', 'after'],
      // transformOrigin: ['hover', 'after'],
      // scale: ['hover','after'],
    }
  },
  plugins: [],
}

