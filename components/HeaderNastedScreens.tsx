import React, { FC } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import GoBackBtn from "./BackBtn";

type RootStackParamList = {
  SearchWeather: { cityName: string };
};

interface IHeaderNastedScreensProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchWeather">;
  title: string;
}

const HeaderNastedScreens: FC<IHeaderNastedScreensProps> = ({
  navigation,
  title,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
    >
      <View className="relative h-16 flex-row items-center pl-[16px] w-full border-b">
        <View className="absolute left-4 z-10">
          <GoBackBtn navigation={navigation} />
        </View>
        <Text className="w-full text-center font-[SoraBold] text-black text-3xl">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderNastedScreens;
