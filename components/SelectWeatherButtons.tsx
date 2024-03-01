import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ISelectWeatherButtonsProps } from "@interfaces/ISelectWeatherButtonsProps";
import { Weather } from "@customEnums/Weather";

const SelectWeatherButtons: FC<ISelectWeatherButtonsProps> = ({
  selectedWeather,
  handleSelectWeather,
}) => {
  return (
    <View className="flex-row justify-between px-[16px]">
      <TouchableOpacity
        className={`px-[24px] py-[8px] rounded-xl ${
          selectedWeather === Weather.Today
            ? "bg-selectedWeatherBtnBcg"
            : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.Today)}
      >
        <Text className="font-[SoraMedium] text-lg tracking-[0.25px]">
          Today
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "Tomorrow"
            ? "bg-selectedWeatherBtnBcg"
            : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.Tomorrow)}
      >
        <Text className="font-[SoraMedium] text-lg tracking-[0.25px]">
          Tomorrow
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-[35px] py-[9px] rounded-xl ${
          selectedWeather === "10 days"
            ? "bg-selectedWeatherBtnBcg"
            : "bg-white"
        } `}
        onPress={() => handleSelectWeather(Weather.TenDays)}
      >
        <Text className="font-[SoraMedium] text-lg tracking-[0.25px]">
          {/* 10 days */}3 days
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectWeatherButtons;
