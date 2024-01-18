import React, { FC } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IForecastWeather } from "../CurrentWeather";
import { getTime } from "../../../utils/getTime";

interface IHourlyForecast {
  weather: IForecastWeather;
}

const HourlyForecast: FC<IHourlyForecast> = ({ weather }) => {
  const currentDateTime = new Date();

  const filteredHours = weather?.forecast?.forecastday[0].hour.filter(
    (item) => {
      const itemDateTime = new Date(item.time);
      return (
        itemDateTime.getTime() >= currentDateTime.getTime() &&
        itemDateTime.getTime() <=
          new Date(
            currentDateTime.getFullYear(),
            currentDateTime.getMonth(),
            currentDateTime.getDate(),
            23,
            59,
            59,
            999
          ).getTime()
      );
    }
  );

  return (
    <View>
      <View className="flex-row items-center px-[16px]">
        <View className="p-1 bg-white rounded-full">
          <MaterialCommunityIcons name="hours-24" size={24} color="black" />
        </View>
        <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
          Hourly forecast
        </Text>
      </View>
      
      <ScrollView horizontal>
        {filteredHours.map((item, index) => {
          return (
            <View
              key={index}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
            >
              <Text className="font-[SoraRegular] text-sm tracking-[0.25px] leading-5">
                {getTime(item.time)}
              </Text>

              <Image
                source={{ uri: `https:${item.condition.icon}` }}
                className="w-11 h-11"
              />

              <Text className="font-[SoraRegular] text-sm tracking-[0.25px] leading-5">
                {item.temp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HourlyForecast;
