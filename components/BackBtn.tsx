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
