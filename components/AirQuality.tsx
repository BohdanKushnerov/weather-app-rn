import React, { FC } from "react";
import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { getAirQualityInfo } from "@utils/getAirQualityInfo";
import { formatNumber } from "@utils/formatNumber";
import { IAirQualityProps } from "@interfaces/IAirQualityProps";

const AirQuality: FC<IAirQualityProps> = ({ airQuality }) => {
  const { bgColor, status } = getAirQualityInfo(airQuality["us-epa-index"]);

  return (
    <View className="mx-[16px] px-[16px] py-[16px] mb-[16px] bg-secondaryBcg rounded-3xl">
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
            {formatNumber(airQuality.co)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Ozone (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formatNumber(airQuality.o3)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Nitrogen dioxide (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formatNumber(airQuality.no2)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            Sulphur dioxide (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formatNumber(airQuality.so2)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            PM2.5 (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formatNumber(airQuality.pm2_5)}
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-x-2">
          <Text className="font-[SoraMedium] text-lg tracking-[0.25px] leading-5">
            PM10 (μg/m3) :
          </Text>
          <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
            {formatNumber(airQuality.pm10)}
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
