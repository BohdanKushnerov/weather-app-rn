import React from "react";
import { View, Text } from "react-native";

const data = [
  { Index: 1, Band: "Low", µgm3: "0-11" },
  { Index: 2, Band: "Low", µgm3: "12-23" },
  { Index: 3, Band: "Low", µgm3: "24-35" },
  { Index: 4, Band: "Mod.", µgm3: "36-41" },
  { Index: 5, Band: "Mod.", µgm3: "42-47" },
  { Index: 6, Band: "Mod.", µgm3: "48-53" },
  { Index: 7, Band: "High", µgm3: "54-58" },
  { Index: 8, Band: "High", µgm3: "59-64" },
  { Index: 9, Band: "High", µgm3: "65-70" },
  { Index: 10, Band: "Very High", µgm3: "71 or more" },
];

const AirQualityTable = () => {
  return (
    <View className="flex-row max-w-max">
      {data.map((row, index) => (
        <View
          key={index}
          className={`flex-1 border border-r-0 ${
            index === data.length - 1 && "border-r"
          }`}
        >
          <Text className="font-[SoraMedium] text-center text-xs border-b">
            {row.Index}
          </Text>
          <Text className="h-8 font-[SoraMedium] text-center text-xs border-b">
            {row.Band}
          </Text>
          <Text className="font-[SoraMedium] text-center text-xs">
            {row.µgm3}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AirQualityTable;
