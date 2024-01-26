import { FC } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoaderComponent from "./LoaderComponent";
import { getTime } from "@utils/getTime";
import { IWeatherHour } from "@interfaces/IWeatherHour";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { Weather } from "@customEnums/Weather";
import { TemperatureUnit, useWeatherContext } from "@context/WeatherContext";

interface IHourlyForecastProps {
  weather: IForecastWeather | null;
  selectedWeather: Weather;
}

const HourlyForecast: FC<IHourlyForecastProps> = ({
  weather,
  selectedWeather,
}) => {
  const { weatherSettings } = useWeatherContext();

  let filteredHours: IWeatherHour[] = [];

  if (selectedWeather === Weather.Today) {
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

  // console.log("filteredHours", filteredHours);

  return (
    <>
      {weather ? (
        <View className="mx-[16px] px-[16px] py-[8px] bg-green-200 rounded-3xl">
          <View className="flex-row items-center gap-2">
            <View className="p-1 bg-white rounded-full">
              <MaterialCommunityIcons name="hours-24" size={24} color="black" />
            </View>
            <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
              Hourly forecast
            </Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
            }}
          >
            {filteredHours.map((item, index) => {
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
                    {/* {item.temp_c}&#176; */}
                    {weatherSettings.temp === TemperatureUnit.Celsius
                      ? item.temp_c
                      : item.temp_f}{" "}
                    {weatherSettings.temp}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <LoaderComponent />
      )}
    </>
  );
};

export default HourlyForecast;
