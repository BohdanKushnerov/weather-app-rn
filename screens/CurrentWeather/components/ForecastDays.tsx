import { Fontisto } from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { getFormattedDayName } from "../../../utils/getFormattedDayName";
import { IForecastData, IForecastDay } from "../CurrentWeather";

interface IForecastDaysProps {
  forecast: IForecastData;
}

const ForecastDays: FC<IForecastDaysProps> = ({ forecast }) => {
  return (
    <View className="h-1/2 mb-2 space-y-3 z-30 bg-zinc-600">
      <View className="flex-row justify-center items-center mx-5 space-x-2">
        <Fontisto name="calendar" size={16} color="white" />
        <Text className="text-light text-base">Daily forecast</Text>
      </View>

      <View className="w-full mb-16">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
          {forecast.forecastday?.map((item: IForecastDay, index: number) => {
            return (
              <View
                key={index}
                className="flex flex-row justify-between items-center rounded-3xl p-1"
              >
                <View className="flex flex-row items-center gap-[8px]">
                  <Image
                    source={{
                      uri: `https:${item?.day?.condition?.icon}`,
                    }}
                    className="w-11 h-11"
                  />
                  <Text className="font-[SoraMedium] text-light">
                    {getFormattedDayName(item.date)}
                  </Text>
                  <Text className="font-[SoraMedium] text-light">
                    Rain: {item?.day?.daily_chance_of_rain}%
                  </Text>
                  <Text className="font-[SoraMedium] text-light">
                    Snow: {item?.day?.daily_chance_of_snow}%
                  </Text>
                </View>
                <View className="flex flex-row">
                  <Text className="font-[SoraBold] text-light text-xl">
                    {item?.day?.maxtemp_c}&#176;
                  </Text>
                  <Text className="font-[SoraBold] text-light text-xl">/</Text>
                  <Text className="font-[SoraBold] text-light text-xl">
                    {item?.day?.mintemp_c}&#176;
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ForecastDays;
