// /** @type {import('tailwindcss').Config} */
// import nativewind from "nativewind/tailwind/native";

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SoraRegular: ["Sora-Regular", "sans-serif"],
        SoraMedium: ["Sora-Medium", "sans-serif"],
        SoraSemiBold: ["Sora-SemiBold", "sans-serif"],
        SoraBold: ["Sora-Bold", "sans-serif"],
      },
      backgroundColor: {
        // rosyBrown: "#AC736A",
        ligth: "#F6EDFF",
        dark: "rgb(55 65 81)",
      },
      colors: {
        light: "#FFFFFF",
        dark: "#AAAAAA",
        greenLoader: "#00ff00",
        btn: "#FFFFFF",
        btnAccent: "#E0B6FF",
        item: "rgba(208, 188, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
