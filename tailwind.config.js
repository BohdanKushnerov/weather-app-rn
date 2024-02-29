// /** @type {import('tailwindcss').Config} */
// import nativewind from "nativewind/tailwind/native";

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
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
        mainBcg: "rgb(220 252 231)", // green-100
        secondaryBcg: "rgb(187 247 208)", // green-200
        selectedWeatherBtnBcg: "rgb(74 222 128)", // green-400
        searchCitiesListBcg: "rgb(209 213 219)", // gray-300
        headerCurrentWeatherBcg: "rgb(55 65 81 / 0.5)", // gray-700/50
        mainInfoBcg: "rgb(55 65 81 / 0.2)", // gray-700/20
        myLocationBcg: "rgb(209 213 219)", // gray-300
        deleteCityBtnBcg: "rgb(254 242 242)", // red-50
      },
      colors: {
        primaryRed: "rgb(239 68 68)", // red-500
        primaryGreen: "rgb(74 222 128)", // green-400
        primaryGray: "rgb(156 163 175)", // gray-400
        primaryTextZinc: "rgb(113 113 122)",
        greenLoader: "#00ff00",
      },
    },
  },
  plugins: [],
};
