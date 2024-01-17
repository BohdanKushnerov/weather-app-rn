import React, { FC } from "react";
import { Image, Text, View } from "react-native";

import { IForecastWeather } from "../CurrentWeather";
import formatDate from "../../../utils/formatDate";
import { getTime } from "../../../utils/getTime";
import AdditionalInfo from "./AdditionalInfo";

interface ICurrentCityWeatherInfo {
  weather: IForecastWeather;
}

const CurrentCityWeatherInfo: FC<ICurrentCityWeatherInfo> = ({ weather }) => {
  return (
    <View className="flex items-center px-[16px] py-[16px] bg-rosyBrown rounded-3xl">
      <Text className="font-[SoraBold] text-peachPuff text-base">
        {`${weather.location.name}, ${weather.location.region}, ${weather.location.country}`}
      </Text>

      <Text className="font-[SoraMedium] text-peachPuff text-xs">
        {formatDate(weather.location.localtime)}
      </Text>

      <Text className="font-[SoraRegular] text-peachPuff text-base font-medium">
        Current weather
      </Text>

      <Text className="text-peachPuff text-xs font-medium">
        Last update: {getTime(weather.current.last_updated)}
      </Text>

      <View className="flex flex-row items-center gap-x-[10px]">
        <Image
          className="w-[64px] h-[64px]"
          source={{ uri: `https:${weather.current.condition.icon}` }}
        />
        <View className="flex flex-row">
          <Text className="pt-[12px] font-[SoraBold] text-peachPuff text-6xl">
            {weather.current.temp_c}
          </Text>
          <Text className="text-peachPuff text-6xl">°</Text>
        </View>
      </View>

      <Text className="mb-[5px] text-peachPuff text-sm">
        <Text className="font-[SoraSemiBold]">Condition: </Text>
        {weather.current.condition.text}
      </Text>

      <Text className="mb-[20px] font-[SoraMedium] text-peachPuff text-xs">
        <Text className="font-[SoraSemiBold]">Feels like: </Text>
        {weather.current.feelslike_c}°
      </Text>

      <AdditionalInfo currentWeather={weather.current} />
    </View>
  );
};

export default CurrentCityWeatherInfo;
