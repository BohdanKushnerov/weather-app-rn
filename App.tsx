import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";

import CurrentWeather from "./screens/CurrentWeather/CurrentWeather";

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    SoraRegular: require("./assets/fonts/Sora-Regular.ttf"),
    SoraMedium: require("./assets/fonts/Sora-Medium.ttf"),
    SoraSemiBold: require("./assets/fonts/Sora-SemiBold.ttf"),
    SoraBold: require("./assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View>
      {fontsLoaded ? (
        <CurrentWeather />
      ) : (
        <ActivityIndicator size="small" color="greenLoader" />
      )}
    </View>
  );
};

export default App;
