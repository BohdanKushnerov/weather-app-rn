import React, { FC } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

import { useWeatherContext } from "@context/WeatherContext";
import { getFormattedDayName } from "@utils/getFormattedDayName";
import { IForecastDay } from "@interfaces/IForecastDay";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";

interface IForecastManyDaysProps {
  weather: IForecastWeather | null;
}

const ForecastManyDays: FC<IForecastManyDaysProps> = ({ weather }) => {
  const { weatherSettings } = useWeatherContext();

  return (
    <>
      {weather ? (
        <View className="mb-2 space-y-3 z-30 pb-3">
          <View className="flex-row items-center px-[16px]">
            <View className="p-1 bg-white rounded-full">
              <Fontisto name="calendar" size={16} color="black" />
            </View>
            <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
              Daily forecast
            </Text>
          </View>

          <View className="">
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                gap: 8,
                paddingHorizontal: 16,
              }}
            >
              {weather.forecast.forecastday?.map(
                (item: IForecastDay, index: number) => {
                  return (
                    <View
                      key={index}
                      className="flex-row justify-between items-center rounded-3xl p-[16px] bg-secondaryBcg"
                    >
                      <View className="flex-1 flex-row justify-between items-center">
                        <View>
                          <Text className="font-[SoraMedium] text-black text-base">
                            {getFormattedDayName(item.date)}
                          </Text>
                          <Text className="font-[SoraMedium] max-w-[20vh] text-primaryTextZinc">
                            {item.day.condition.text}
                          </Text>
                        </View>

                        <View className="flex-row">
                          <View className="flex flex-col items-center pr-1 border-r">
                            <Text className="font-[SoraBold] text-black text-xl">
                              {weatherSettings.temp === TemperatureUnit.Celsius
                                ? item?.day?.maxtemp_c
                                : item?.day?.maxtemp_f}
                              {weatherSettings.temp}
                            </Text>

                            <Text className="font-[SoraBold] text-black text-xl">
                              {weatherSettings.temp === TemperatureUnit.Celsius
                                ? item?.day?.mintemp_c
                                : item?.day?.mintemp_f}
                              {weatherSettings.temp}
                            </Text>
                          </View>

                          <Image
                            source={{
                              uri: `https:${item?.day?.condition?.icon}`,
                            }}
                            className="w-11 h-11"
                          />

                          <View>
                            <Text className="font-[SoraMedium] text-black">
                              Rain: {item?.day?.daily_chance_of_rain}%
                            </Text>
                            <Text className="font-[SoraMedium] text-black">
                              Snow: {item?.day?.daily_chance_of_snow}%
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }
              )}
            </ScrollView>
          </View>
        </View>
      ) : (
        <View className="h-[200px] flex justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </>
  );
};

export default ForecastManyDays;
