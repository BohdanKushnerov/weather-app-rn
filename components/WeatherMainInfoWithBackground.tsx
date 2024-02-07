import React, { FC, useEffect, useState } from "react";
import { ImageBackground, View, useWindowDimensions } from "react-native";

import TomorrowCityWeather from "./TomorrowCityWeather";
import LocationCityWeatherInfo from "./LocationCityWeatherInfo";
import { getWeatherNameBcg } from "@utils/getWeatherNameBcg";
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
  const [weactherBcg, setWeatherBcg] = useState<string | null>(null);
  const windowDimensions = useWindowDimensions();

  // console.log("weactherBcg", weactherBcg);

  useEffect(() => {
    if (tomorrowWeather && selectedWeather === "Tomorrow") {
      const weatherText =
        tomorrowWeather?.forecast.forecastday[0].day.condition.text;

      if (weatherText) {
        const value = getWeatherNameBcg(weatherText);

        setWeatherBcg(value);
      }
    }
  }, [tomorrowWeather, selectedWeather]);

  useEffect(() => {
    if (
      (weather && selectedWeather === "Today") ||
      selectedWeather === "10 days"
    ) {
      const weatherText = weather?.current.condition.text;

      // console.log("weatherText", weatherText);

      if (weatherText) {
        // const weatherText = "Blizzard"; // метель
        // const weatherText = "Clear";
        // const weatherText = "Cloudy";
        // const weatherText = "Freezing drizzle"; // Изморозь
        // const weatherText = "Fog";
        // const weatherText = "Light freezing rain";
        // const weatherText = "Heavy rain";
        // const weatherText = "Heavy snow";
        // const weatherText = "Mist"; // Туман
        // const weatherText = "Overcast"; // Пасмурная погода
        // const weatherText = "Partly cloudy";
        // const weatherText = "Patchy light rain in area with thunder";
        // const weatherText = "Light rain";
        // const weatherText = "Light sleet"; // Легкий мокрый снег
        // const weatherText = "Blowing snow"; // метель
        // const weatherText = "Sunny";
        // const weatherText = "Thundery outbreaks in nearby"; // В окрестностях начались грозы
        // const weatherText = "";
        const value = getWeatherNameBcg(weatherText);
        setWeatherBcg(value);
      }
    }
  }, [weather, selectedWeather]);

  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  return (
    <View style={{ width: dimensionsWidth, height: dimensionsHeigth / 1.5 }}>
      {weactherBcg && (
        <ImageBackground
          source={{
            uri: weactherBcg,
          }}
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
      )}
    </View>
  );
};

export default WeatherMainInfoWithBackground;
