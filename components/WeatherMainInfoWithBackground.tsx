import React, { FC } from "react";
import { ImageBackground, View, useWindowDimensions } from "react-native";

import TomorrowCityWeather from "./TomorrowCityWeather";
import LocationCityWeatherInfo from "./LocationCityWeatherInfo";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { Weather } from "@customEnums/Weather";

interface IWeatherMainInfoWithBackgroundProps {
  weather: IForecastWeather | null;
  tomorrowWeather: IForecastWeather | null;
  selectedWeather: Weather;
}

const WeatherMainInfoWithBackground: FC<
  IWeatherMainInfoWithBackgroundProps
> = ({ weather, tomorrowWeather, selectedWeather }) => {
  const windowDimensions = useWindowDimensions();

  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;
  return (
    <ImageBackground
      source={require("@assets/valentin-muller-bWtd1ZyEy6w-unsplash.jpg")}
      resizeMode="cover"
      style={{
        paddingTop: "5%",
        backgroundColor: "gray",
        width: dimensionsWidth,
        height: dimensionsHeigth / 1.5,
      }}
    >
      <View className="relative rounded-3xl">
        {(selectedWeather === Weather.Today ||
          selectedWeather === Weather.TenDays) && (
          <LocationCityWeatherInfo weather={weather} />
        )}

        {selectedWeather === "Tomorrow" && (
          <TomorrowCityWeather weather={tomorrowWeather} />
        )}
      </View>
    </ImageBackground>
  );
};

export default WeatherMainInfoWithBackground;
