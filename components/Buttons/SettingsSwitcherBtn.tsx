import React, { FC } from "react";
import { Text, View } from "react-native";
import { Switch } from "react-native-switch";

interface ISettingsSwitcherBtnProps {
  name: string;
  value: boolean;
  handleChange: () => void;
  activeText: string;
  inActiveText: string;
}

const SettingsSwitcherBtn: FC<ISettingsSwitcherBtnProps> = ({
  name,
  value,
  handleChange,
  activeText,
  inActiveText,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-2 rounded-xl">
      <Text className="font-[SoraMedium] text-base tracking-[0.25px]">
        {name}
      </Text>
      <Switch
        circleBorderActiveColor="black"
        switchWidthMultiplier={3}
        circleBorderWidth={1}
        activeTextStyle={{
          color: "black",
          fontFamily: "SoraMedium",
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.25,
        }}
        inactiveTextStyle={{
          color: "black",
          fontFamily: "SoraMedium",
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.25,
        }}
        value={value}
        onValueChange={handleChange}
        activeText={activeText}
        inActiveText={inActiveText}
        backgroundActive={"rgb(134 239 172)"}
        backgroundInactive={"rgb(134 239 172)"}
        circleActiveColor={"rgb(22 163 74)"}
        circleInActiveColor={"rgb(22 163 74)"}
      />
    </View>
  );
};

export default SettingsSwitcherBtn;
