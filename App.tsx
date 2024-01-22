import { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./customTypes/RootStackParamList";
import CurrentWeather from "@screens/CurrentWeather";
import SearchWeather from "@screens/SearchWeather";
import SettingsWeather from "@screens/SettingsWeather";
import HeaderNastedScreens from "@components/HeaderNastedScreens";

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    SoraRegular: require("./assets/fonts/Sora-Regular.ttf"),
    SoraMedium: require("./assets/fonts/Sora-Medium.ttf"),
    SoraSemiBold: require("./assets/fonts/Sora-SemiBold.ttf"),
    SoraBold: require("./assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CurrentWeather">
          <Stack.Screen
            options={{ headerShown: false }}
            name="CurrentWeather"
            component={CurrentWeather}
          />
          <Stack.Screen
            name="SearchWeather"
            component={SearchWeather}
            options={({ navigation }) => ({
              header: () => (
                <HeaderNastedScreens
                  navigation={navigation}
                  title="SearchWeather"
                />
              ),
            })}
          />

          <Stack.Screen
            // options={{ headerShown: false }}
            name="SettingsWeather"
            component={SettingsWeather}
            options={({ navigation }) => ({
              header: () => (
                <HeaderNastedScreens
                  navigation={navigation}
                  title="SettingsWeather"
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
