import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo, Fontisto } from "@expo/vector-icons";

import LoaderComponent from "./LoaderComponent";
import { getTime } from "@utils/getTime";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { RootStackParamList } from "@customTypes/RootStackParamList";

interface IHeaderCurrentWeatherProps {
  weather: IForecastWeather | null;
}

const HeaderCurrentWeather: FC<IHeaderCurrentWeatherProps> = ({ weather }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      className={`w-full p-2 z-10 flex flex-row items-center justify-between bg-gray-700/50 rounded-3xl`}
      style={{
        position: "absolute",
        right: 0,
        top: insets.top,
      }}
    >
      {weather ? (
        <View className="flex-col">
          <Text
            className="font-[SoraBold] text-white text-3xl"
            style={{
              flex: 1,
              maxWidth: `${80}%`,
            }}
          >
            {weather.location.name}, {weather.location.country}
          </Text>

          <Text className="text-white text-base font-medium">
            Last update weather: {getTime(weather.current.last_updated)}
          </Text>
        </View>
      ) : (
        <LoaderComponent />
      )}

      <View className="w-[20%] flex-row gap-x-2 items-center justify-end">
        {
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchWeather", {})}
            className="p-2"
          >
            <Fontisto name="search" size={24} color="white" />
          </TouchableOpacity>
        }

        <TouchableOpacity
          onPress={() => navigation.navigate("SettingsWeather", {})}
          className="p-2"
        >
          <Entypo name="menu" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderCurrentWeather;
