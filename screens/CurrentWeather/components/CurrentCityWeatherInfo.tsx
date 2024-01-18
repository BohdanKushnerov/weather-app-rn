import React, { FC } from "react";
import { Image, Text, View } from "react-native";

import { IForecastWeather } from "../CurrentWeather";
import formatDate from "../../../utils/formatDate";
import { getTime } from "../../../utils/getTime";

interface ICurrentCityWeatherInfo {
  weather: IForecastWeather;
}

const CurrentCityWeatherInfo: FC<ICurrentCityWeatherInfo> = ({ weather }) => {
  return (
    <View className="flex-1 p-[16px] flex-col justify-between">
      <View>
        <Text className="font-[SoraBold] text-light text-3xl">
          {`${weather.location.name}, ${weather.location.country}`}
        </Text>

        <Text className="text-light text-base font-medium">
          Last update weather: {getTime(weather.current.last_updated)}
        </Text>
      </View>

      <View className="flex-row justify-between items-baseline">
        <View className="flex-col">
          <View className="flex-row">
            <Text className="pt-[12px] font-[SoraBold] text-light text-9xl">
              {weather.current.temp_c}
            </Text>
            <Text className="text-light text-7xl">&#176;</Text>
          </View>

          <Text className="font-[SoraSemiBold] text-2xl text-light">
            Feels like: {weather.current.feelslike_c}&#176;
          </Text>
        </View>

        <View className="flex-col items-center">
          <Image
            className="w-[128px] h-[128px]"
            source={{ uri: `https:${weather.current.condition.icon}` }}
          />
          <Text className="font-[SoraSemiBold] text-light text-2xl">
            {weather.current.condition.text}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-end">
        <Text className="font-[SoraMedium] text-light text-xl">
          {formatDate(weather.location.localtime)}
        </Text>
        <View>
          <Text className="font-[SoraSemiBold] text-light text-2xl">
            Day: {weather.forecast.forecastday[0].day.maxtemp_c}&#176;
          </Text>
          <Text className="font-[SoraSemiBold] text-light text-2xl">
            Nigth: {weather.forecast.forecastday[0].day.mintemp_c}&#176;
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentCityWeatherInfo;
