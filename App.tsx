import { FC } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { styled } from "nativewind";

import CurrentWeather from "./screens/CurrentWeather/CurrentWeather";

const AppView = styled(View);

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    SoraRegular: require("./assets/fonts/Sora-Regular.ttf"),
    SoraMedium: require("./assets/fonts/Sora-Medium.ttf"),
    SoraSemiBold: require("./assets/fonts/Sora-SemiBold.ttf"),
    SoraBold: require("./assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AppView className="flex-1 items-center p-10">
      <CurrentWeather />
    </AppView>
  );
};

export default App;
