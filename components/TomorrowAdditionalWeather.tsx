import React, { FC } from "react";
import { View } from "react-native";

import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";
import LoaderComponent from "./LoaderComponent";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { Weather } from "@customEnums/Weather";

interface ITomorrowAdditionalWeatherProps {
  tomorrowWeather: IForecastWeather | null;
  selectedWeather: Weather;
}

const TomorrowAdditionalWeather: FC<ITomorrowAdditionalWeatherProps> = ({
  tomorrowWeather,
  selectedWeather,
}) => {
  // console.log("tomorrowWeather",tomorrowWeather?.forecast.forecastday);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <WeatherDetails weather={tomorrowWeather} />
      <HourlyForecast
        weather={tomorrowWeather}
        selectedWeather={selectedWeather}
      />

      {/* нету на бесплатном плане на завтра*/}
      {tomorrowWeather ? (
        // <AirQuality
        //   airQuality={tomorrowWeather?.forecast.forecastday[0].day.air_quality}
        // />
        <></>
      ) : (
        <LoaderComponent />
      )}
    </View>
  );
};

export default TomorrowAdditionalWeather;
