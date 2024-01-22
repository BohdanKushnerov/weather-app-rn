import { FC } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

import { formatDate } from "../utils/formatDate";
// import { getTime } from "../utils/getTime";
import { IForecastWeather } from "../interfaces/IForecastWeather";

interface ILocationCityWeatherInfoProps {
  weather: IForecastWeather | null;
}

const LocationCityWeatherInfo: FC<ILocationCityWeatherInfoProps> = ({
  weather,
}) => {
  return (
    <>
      {weather ? (
        <View className="flex flex-col justify-end h-full p-[16px]">
          {/* <View>
            <Text className="font-[SoraBold] text-white text-3xl">
              {`${weather.location.name}, ${weather.location.country}`}
            </Text>

            <Text className="text-white text-base font-medium">
              Last update weather: {getTime(weather.current.last_updated)}
            </Text>
          </View> */}

          <View className="flex-col gap-y-[25%]">
            <View className="flex-row justify-between items-end">
              <View className="flex-col">
                <View className="flex-row">
                  <Text className="pt-[12px] font-[SoraBold] text-white text-8xl">
                    {weather.current.temp_c}
                  </Text>
                  <Text className="text-white text-7xl">&#176;</Text>
                </View>

                <Text className="font-[SoraSemiBold] text-2xl text-white">
                  Feels like: {weather.current.feelslike_c}&#176;
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
                  Day: {weather.forecast.forecastday[0].day.maxtemp_c}&#176;
                </Text>
                <Text className="font-[SoraSemiBold] text-white text-2xl">
                  Nigth: {weather.forecast.forecastday[0].day.mintemp_c}&#176;
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
