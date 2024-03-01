import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@customTypes/RootStackParamList";

export interface IGoBackBtnProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchWeather">;
}
