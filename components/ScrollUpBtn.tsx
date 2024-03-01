import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { IScrollUpBtnProps } from "@interfaces/IScrollUpBtnProps";

const ScrollUpBtn: FC<IScrollUpBtnProps> = ({ scrollToTop }) => {
  return (
    <TouchableOpacity
      className="absolute bottom-0 right-0 p-4"
      onPress={scrollToTop}
    >
      <Feather name="arrow-up-circle" size={48} color="#858b8692" />
    </TouchableOpacity>
  );
};

export default ScrollUpBtn;
