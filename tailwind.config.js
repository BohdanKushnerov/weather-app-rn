// /** @type {import('tailwindcss').Config} */
// import nativewind from "nativewind/tailwind/native";

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SoraRegular: ["Sora-Regular", "sans-serif"],
        SoraMedium: ["Sora-Medium", "sans-serif"],
        SoraSemiBold: ["Sora-SemiBold", "sans-serif"],
        SoraBold: ["Sora-Bold", "sans-serif"],
      },
      backgroundColor: {
        rosyBrown: "#AC736A",
      },
      // colors: {
      //   PeachPuff: "#F6C8A4",
      // },
      colors: {
        peachPuff: "#F6C8A4",
      },
    },
  },
  plugins: [],
};
