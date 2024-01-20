import { FC } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getTime } from "@utils/getTime";
import { IWeatherHour } from "@interfaces/IWeatherHour";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { WeatherType } from "@customTypes/WeatherType";

interface IHourlyForecast {
  weather: IForecastWeather | null;
  selectedWeather: WeatherType;
}

const HourlyForecast: FC<IHourlyForecast> = ({ weather, selectedWeather }) => {
  let filteredHours: IWeatherHour[] = [];

  if (selectedWeather === "Today") {
    const currentDateTime = new Date();

    filteredHours = (weather?.forecast?.forecastday[0].hour || []).filter(
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
  } else {
    filteredHours = weather?.forecast?.forecastday[0].hour || [];
  }

  return (
    <>
      {weather ? (
        <View className="mx-[16px] px-[16px] py-[8px] mb-[16px] bg-green-200 rounded-3xl">
          <View className="flex-row items-center ">
            <View className="p-1 bg-white rounded-full">
              <MaterialCommunityIcons name="hours-24" size={24} color="black" />
            </View>
            <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
              Hourly forecast
            </Text>
          </View>

          <ScrollView horizontal>
            {filteredHours.map((item, index) => {
              // console.log("item ==========================", item)
              return (
                <View
                  key={index}
                  className="flex justify-center items-center w-12 rounded-3xl py-3"
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
      ) : (
        <View className="h-[100px] flex justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </>
  );
};

export default HourlyForecast;
