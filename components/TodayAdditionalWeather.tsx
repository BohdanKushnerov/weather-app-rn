import React, { FC } from "react";
import { View } from "react-native";
import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";
import AirQuality from "./AirQuality";
import LoaderComponent from "./LoaderComponent";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { Weather } from "@customEnums/Weather";

interface ITodayAdditionalWeatherProps {
  weather: IForecastWeather | null;
  selectedWeather: Weather;
}

const TodayAdditionalWeather: FC<ITodayAdditionalWeatherProps> = ({
  weather,
  selectedWeather,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <WeatherDetails weather={weather} />
      <HourlyForecast weather={weather} selectedWeather={selectedWeather} />
      {weather ? (
        <AirQuality airQuality={weather.current.air_quality} />
      ) : (
        <LoaderComponent />
      )}
    </View>
  );
};

export default TodayAdditionalWeather;
