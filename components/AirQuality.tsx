import { FC } from "react";
import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { IAirQualityProps } from "@interfaces/IAirQualityProps";

const getAirQualityInfo = (airQuality: number) => {
  let bgColor, status;

  switch (airQuality) {
    case 1:
      bgColor = "bg-green-500"; // Green
      status = "Good";
      break;
    case 2:
      bgColor = "bg-yellow-500"; // Yellow-Green
      status = "Moderate";
      break;
    case 3:
      bgColor = "bg-yellow-300"; // Yellow
      status = "Unhealthy for Sensitive Groups";
      break;
    case 4:
      bgColor = "bg-orange-500"; // Orange
      status = "Unhealthy";
      break;
    case 5:
      bgColor = "bg-red-500"; // Red-Orange
      status = "Very Unhealthy";
      break;
    case 6:
      bgColor = "bg-red-800"; // Red
      status = "Hazardous";
      break;
    default:
      bgColor = "bg-gray-500"; // Gray for unknown
      status = "Unknown";
  }

  return { bgColor, status };
};

const formattedNumber = (num: number) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const AirQuality: FC<IAirQualityProps> = ({ airQuality }) => {
  const { bgColor, status } = getAirQualityInfo(airQuality["us-epa-index"]);

  return (
    <View className="mx-[16px] px-[16px] py-[16px] mb-[16px] bg-green-200 rounded-3xl">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <View className="p-1 bg-white rounded-full">
            <Entypo name="air" size={24} color="black" />
          </View>
          <Text className="font-[SoraMedium] text-base tracking-[0.25px] leading-5">
            Air Quality
          </Text>
        </View>
        <Text
          className={`p-1 rounded-md font-[SoraMedium] text-base tracking-[0.25px] leading-5 ${bgColor}`}
        >
          {status}
        </Text>
      </View>

      <View className="flex-col gap-2 pt-2">
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Carbon Monoxide (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.co)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Ozone (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.o3)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Nitrogen dioxide (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.no2)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Sulphur dioxide (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.so2)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            PM2.5 (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.pm2_5)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            PM10 (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formattedNumber(airQuality.pm10)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            US - EPA standard :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {airQuality["us-epa-index"]}
          </Text>
        </View>
      </View>
    </View>

    
  );
};

export default AirQuality;
