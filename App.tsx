import { FC } from "react";
import { ActivityIndicator, SafeAreaView, Settings, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import BackBtn from "./components/BackBtn";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./customTypes/RootStackParamList";
import CurrentWeather from "@screens/CurrentWeather";
import SearchWeather from "@screens/SearchWeather";
import SettingsWeather from "@screens/SettingsWeather";
// import qweq from "@screen/";

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
    <SafeAreaView style={{ flex: 1 }}>
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
              tabBarStyle: { display: "none" },
              headerLeft: () => <BackBtn navigation={navigation} />,
              headerLeftContainerStyle: { marginLeft: 20 },
              headerRightContainerStyle: { marginRight: 20 },
              // headerShown: false, // Move headerShown into the options object
            })}
          />

          <Stack.Screen
            // options={{ headerShown: false }}
            name="SettingsWeather"
            component={SettingsWeather}
            options={({ navigation }) => ({
              tabBarStyle: { display: "none" },
              headerLeft: () => <BackBtn navigation={navigation} />,
              headerLeftContainerStyle: { marginLeft: 20 },
              headerRightContainerStyle: { marginRight: 20 },
              // headerShown: false, // Move headerShown into the options object
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
