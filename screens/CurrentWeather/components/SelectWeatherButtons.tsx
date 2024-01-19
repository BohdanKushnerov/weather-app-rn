import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WeatherType } from "../CurrentWeather";

interface ISelectWeatherButtons {
  selectedWeather: WeatherType;
  handleSelectWeather: (selectedWeather: WeatherType) => void;
}

const SelectWeatherButtons: FC<ISelectWeatherButtons> = ({
  selectedWeather,
  handleSelectWeather,
}) => {
  return (
    <View className="flex-row justify-between px-[16px]">
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "Today" ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather("Today")}
      >
        <Text>Today</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "Tomorrow" ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather("Tomorrow")}
      >
        <Text>Tomorrow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "10 days" ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather("10 days")}
      >
        <Text>10 days</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectWeatherButtons;
