import { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { IForecastWeather } from "@interfaces/IForecastWeather";
import {
  DistanceUnit,
  PressureUnit,
  WindSpeedUnit,
  useWeatherContext,
} from "@context/WeatherContext";

interface IWeatherDetailsProps {
  weather: IForecastWeather | null;
}

const WeatherDetails: FC<IWeatherDetailsProps> = ({ weather }) => {
  const { weatherSettings } = useWeatherContext();

  return (
    <>
      {weather ? (
        <View className="flex flex-row flex-wrap gap-2 justify-center px-[16px]">
          {/* Rain */}
          <View className="flex-row gap-x-2 items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <Ionicons name="rainy-outline" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Rain
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
              </Text>
            </View>
          </View>
          {/* Snow */}
          <View className="flex-row gap-x-2 items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <FontAwesome name="snowflake-o" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Snow
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weather.forecast.forecastday[0].day.daily_chance_of_snow}%
              </Text>
            </View>
          </View>
          {/* Wind */}
          <View className="flex-row  gap-x-2  items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <Feather name="wind" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Wind speed:
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weatherSettings.windSpeed === WindSpeedUnit.KilometersPerHour
                  ? weather.current.wind_kph
                  : weather.current.wind_mph}{" "}
                {weatherSettings.windSpeed}
              </Text>
            </View>
          </View>
          {/* Pressure */}
          <View className="flex-row  gap-x-2  items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <MaterialCommunityIcons name="gauge" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Pressure
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weatherSettings.pressure === PressureUnit.Millibar
                  ? weather.current.pressure_mb
                  : weather.current.pressure_in}{" "}
                {weatherSettings.pressure}
              </Text>
            </View>
          </View>
          {/* UV Index */}
          <View className="flex-row gap-x-2 items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <Feather name="sun" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                UV Index
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weather.current.uv}
              </Text>
            </View>
          </View>

          {/* Visibility */}
          <View className="flex-row gap-x-2 items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <MaterialIcons name="visibility" size={24} color="black" />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Visibility
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weatherSettings.distance === DistanceUnit.Kilometers
                  ? weather.current.vis_km
                  : weather.current.vis_miles}{" "}
                {weatherSettings.distance}
              </Text>
            </View>
          </View>
          {/* Humidity */}
          <View className="flex-row gap-x-2 items-center h-[65px] p-[10px] rounded-xl bg-green-200">
            <View className="p-1 bg-white rounded-full">
              <MaterialCommunityIcons
                name="air-humidifier"
                size={24}
                color="black"
              />
            </View>
            <View>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                Humidity
              </Text>
              <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
                {weather.current.humidity}%
              </Text>
            </View>
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

export default WeatherDetails;
