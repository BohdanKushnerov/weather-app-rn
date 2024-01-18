import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { IForecastWeather } from "../CurrentWeather";
import { getTime } from "../../../utils/getTime";
import { formatDate } from "../../../utils/formatDate";

interface ITomorrowCityWeather {
  weather: IForecastWeather;
}

const TomorrowCityWeather: FC<ITomorrowCityWeather> = ({ weather }) => {
  return (
    <View className="p-[16px] flex-col gap-y-10">
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
          <Text className="max-w-[150px] font-[SoraSemiBold] text-center text-light text-2xl">
            Average temperature:
          </Text>

          <View className="flex-row">
            <Text className="pt-[12px] font-[SoraBold] text-light text-8xl">
              {weather.forecast.forecastday[0].day.avgtemp_c}
            </Text>
            <Text className="text-light text-7xl">&#176;</Text>
          </View>
        </View>

        <View className="max-w-[150px] flex-col items-center">
          <Image
            className="w-[128px] h-[128px]"
            source={{
              uri: `https:${weather.forecast.forecastday[0].day.condition.icon}`,
            }}
          />
          <Text className="font-[SoraSemiBold] text-center text-light text-2xl">
            {weather.forecast.forecastday[0].day.condition.text}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-end">
        <Text className="font-[SoraMedium] text-light text-xl">
          {formatDate(weather.forecast.forecastday[0].date)}
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

export default TomorrowCityWeather;
