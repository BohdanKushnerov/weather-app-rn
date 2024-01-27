import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

type RootStackParamList = {
  SearchWeather: { cityName: string };
};

interface IGoBackBtnProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchWeather">;
}

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
