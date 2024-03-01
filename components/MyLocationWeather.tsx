import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import LoaderComponent from "@components/LoaderComponent";
import { useWeatherContext } from "@context/WeatherContext";
import { IMyLocationWeather } from "@interfaces/IMyLocationWeather";
import { RootStackParamList } from "@customTypes/RootStackParamList";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";

const MyLocationWeather: FC<IMyLocationWeather> = ({ myLocationWeather }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { weatherSettings } = useWeatherContext();

  return (
    <>
      <View className="flex-row justify-center items-center gap-x-2 p-2">
        <Entypo name="home" size={24} color="black" />
        <Text className="font-[SoraBold] text-base tracking-[0.25px] leading-5">
          Current location weather
        </Text>
      </View>
      {myLocationWeather ? (
        <TouchableOpacity
          className="w-full flex-row justify-between items-center py-2 px-4 bg-myLocationBcg rounded-md border"
          onPress={() =>
            navigation.navigate("CurrentWeather", {
              cityName: myLocationWeather?.location.name,
            })
          }
        >
          <View className="flex-col">
            <Text className="font-[SoraSemiBold] text-base tracking-[0.25px] leading-5">
              {myLocationWeather?.location.name}
            </Text>
            <View className="flex-row">
              <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                {myLocationWeather?.location.region},
              </Text>
              <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                {myLocationWeather?.location.country}
              </Text>
            </View>
          </View>
          <Text className="font-[SoraBold] text-2xl tracking-[0.25px] leading-10">
            {weatherSettings.temp === TemperatureUnit.Celsius
              ? myLocationWeather?.current.temp_c
              : myLocationWeather?.current.temp_f}{" "}
            {weatherSettings.temp}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="h-[50px]">
          <LoaderComponent />
        </View>
      )}
    </>
  );
};

export default MyLocationWeather;
