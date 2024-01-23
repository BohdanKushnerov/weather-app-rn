import { FC, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Switch } from "react-native-switch";

const SettingsWeather: FC = () => {
  const [temp, setTemp] = useState(true);
  const [windSpeed, setWindSpeed] = useState(true);
  const [distance, setDistance] = useState(true);
  const [pressure, setPressure] = useState(true);


  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <View className="flex-col gap-y-2 px-5 py-2">
        <View className="flex-row justify-between items-center">
          <Text>Temperature</Text>
          <Switch
            value={temp}
            onValueChange={() => setTemp((prev) => !prev)}
            // disabled={false}
            activeText={`${"\u00b0"}C`}
            inActiveText={`${"\u00b0"}F`}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Distance</Text>
          <Switch
            value={distance}
            onValueChange={() => setDistance((prev) => !prev)}
            // disabled={false}
            activeText={"km"}
            inActiveText={"ml"}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Pressure</Text>
          <Switch
            value={pressure}
            onValueChange={() => setPressure((prev) => !prev)}
            // disabled={false}
            activeText={"mBar"}
            inActiveText={"inHg"}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Wind Speed</Text>
          <Switch
            value={windSpeed}
            onValueChange={() => setWindSpeed((prev) => !prev)}
            // disabled={false}
            activeText={"k/h"}
            inActiveText={"mph"}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default SettingsWeather;
