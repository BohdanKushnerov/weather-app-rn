import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Weather } from "@customEnums/Weather";

interface ISelectWeatherButtons {
  selectedWeather: Weather;
  handleSelectWeather: (selectedWeather: Weather) => void;
}

const SelectWeatherButtons: FC<ISelectWeatherButtons> = ({
  selectedWeather,
  handleSelectWeather,
}) => {
  return (
    <View className="flex-row justify-between px-[16px]">
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === Weather.Today ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.Today)}
      >
        <Text>Today</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "Tomorrow" ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.Tomorrow)}
      >
        <Text>Tomorrow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "10 days" ? "bg-green-400" : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.TenDays)}
      >
        <Text>10 days</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectWeatherButtons;
