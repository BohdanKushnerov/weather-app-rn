import React, { FC } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

import { useWeatherContext } from "@context/WeatherContext";
import { formatDate } from "@utils/formatDate";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";

interface ITomorrowWeatherMainInfoProps {
  weather: IForecastWeather | null;
}

const TomorrowWeatherMainInfo: FC<ITomorrowWeatherMainInfoProps> = ({
  weather,
}) => {
  const { weatherSettings } = useWeatherContext();

  return (
    <>
      {weather ? (
        <View className="flex flex-col justify-end h-full p-[16px] bg-mainInfoBcg">
          <View className="flex-col gap-y-[25%]">
            <View className="flex-row justify-between items-end">
              <View className="flex-col">
                <Text className="max-w-[150px] font-[SoraSemiBold] text-center text-white text-2xl">
                  Average temperature:
                </Text>

                <View className="flex-row">
                  <Text className="pt-[12px] font-[SoraBold] text-white text-8xl">
                    {weatherSettings.temp === TemperatureUnit.Celsius
                      ? weather.forecast.forecastday[0].day.avgtemp_c
                      : weather.forecast.forecastday[0].day.avgtemp_f}
                  </Text>
                  <Text className="text-white text-7xl">
                    {weatherSettings.temp}
                  </Text>
                </View>
              </View>

              <View className="max-w-[150px] flex-col items-center">
                <Image
                  className="w-[128px] h-[128px]"
                  source={{
                    uri: `https:${weather.forecast.forecastday[0].day.condition.icon}`,
                  }}
                />
                <Text className="font-[SoraSemiBold] text-center text-white text-2xl">
                  {weather.forecast.forecastday[0].day.condition.text}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-end">
              <Text className="font-[SoraMedium] text-white text-xl">
                {formatDate(weather.forecast.forecastday[0].date)}
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

export default TomorrowWeatherMainInfo;
