import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { IGoBackBtnProps } from "@interfaces/IGoBackBtnProps";

const GoBackBtn: FC<IGoBackBtnProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <AntDesign name="arrowleft" size={36} color="black" />
    </TouchableOpacity>
  );
};

export default GoBackBtn;
