import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "@customTypes/RootStackParamList";

export interface IHeaderNastedScreensProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchWeather">;
  title: string;
}
