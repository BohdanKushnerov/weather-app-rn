import { FC } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

import { formatDate } from "../utils/formatDate";
import { IForecastWeather } from "../interfaces/IForecastWeather";
import { TemperatureUnit, useWeatherContext } from "@context/WeatherContext";

interface ILocationCityWeatherInfoProps {
  weather: IForecastWeather | null;
}

const LocationCityWeatherInfo: FC<ILocationCityWeatherInfoProps> = ({
  weather,
}) => {
  const { weatherSettings } = useWeatherContext();

  return (
    <>
      {weather ? (
        <View className="flex flex-col justify-end h-full p-[16px]">
          <View className="flex-col gap-y-[25%]">
            <View className="flex-row justify-between items-end">
              <View className="flex-col">
                <View className="flex-row">
                  <Text className="pt-[12px] font-[SoraBold] text-white text-8xl">
                    {weatherSettings.temp === TemperatureUnit.Celsius
                      ? weather.current.temp_c
                      : weather.current.temp_f}
                  </Text>
                  <Text className="text-white text-7xl">
                    {weatherSettings.temp}
                  </Text>
                </View>

                <Text className="font-[SoraSemiBold] text-2xl text-white">
                  Feels like:{"  "}
                  {weatherSettings.temp === TemperatureUnit.Celsius
                    ? weather.current.feelslike_c
                    : weather.current.feelslike_f}
                  {weatherSettings.temp}
                </Text>
              </View>

              <View className="max-w-[150px] flex-col items-center">
                <Image
                  className="w-[128px] h-[128px]"
                  source={{ uri: `https:${weather.current.condition.icon}` }}
                />
                <Text className="font-[SoraSemiBold] text-white text-2xl">
                  {weather.current.condition.text}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-end">
              <Text className="font-[SoraMedium] text-white text-xl">
                {formatDate(weather.location.localtime)}
              </Text>
              <View>
                <Text className="font-[SoraSemiBold] text-white text-2xl">
                  Day:{"  "}
                  {weatherSettings.temp === TemperatureUnit.Celsius
                    ? weather.forecast.forecastday[0].day.maxtemp_c
                    : weather.forecast.forecastday[0].day.maxtemp_f}
                  {weatherSettings.temp}
                </Text>
                <Text className="font-[SoraSemiBold] text-white text-2xl">
                  Nigth:{"  "}
                  {weatherSettings.temp === TemperatureUnit.Celsius
                    ? weather.forecast.forecastday[0].day.mintemp_c
                    : weather.forecast.forecastday[0].day.mintemp_f}
                  {weatherSettings.temp}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className="h-full flex justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </>
  );
};

export default LocationCityWeatherInfo;
