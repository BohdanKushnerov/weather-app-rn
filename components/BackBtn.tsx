import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SearchWeather: { cityName: string };
};

interface IGoBackBtnProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchWeather">;
}

const GoBackBtn: FC<IGoBackBtnProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <AntDesign name="arrowleft" size={24} color="#212121cc" />
    </TouchableOpacity>
  );
};

export default GoBackBtn;
