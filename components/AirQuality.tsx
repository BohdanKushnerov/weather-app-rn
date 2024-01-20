import { FC } from "react";
import { View, Text } from "react-native";

import { IAirQualityProps } from "@interfaces/IAirQualityProps";

const sharedStyles = {
  mainContainer: "mb-4 p-4 rounded-lg bg-slate-300",
  title: "mb-2 font-bold text-lg",
  rowContainer: "flex flex-row items-center mr-4 mb-2",
  label: "mr-1",
  value: "font-bold",
};

const AirQuality: FC<IAirQualityProps> = ({ airQuality }) => {
  return (
    <View className={sharedStyles.mainContainer}>
      <Text className={sharedStyles.title}>Air Quality:</Text>

      {Object.entries(airQuality).map(([key, value]) => (
        <View key={key} className={sharedStyles.rowContainer}>
          <Text className={sharedStyles.label}>{key}:</Text>
          <Text className={sharedStyles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default AirQuality;
