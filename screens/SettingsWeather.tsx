import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Switch } from "react-native-switch";
import {
  DistanceUnit,
  PressureUnit,
  TemperatureUnit,
  WindSpeedUnit,
  useWeatherContext,
} from "@context/WeatherContext";

const SettingsWeather: FC = () => {
  const { weatherSettings, setWeatherSettings } = useWeatherContext();

  console.log("weatherContext", weatherSettings);
  console.log("setWeatherSettings", setWeatherSettings);

  const handleChangeTempValue = () => {
    setWeatherSettings((prev) => ({
      ...prev,
      temp:
        prev.temp === TemperatureUnit.Celsius
          ? TemperatureUnit.Fahrenheit
          : TemperatureUnit.Celsius,
    }));
  };

  const handleChangeDistanceValue = () => {
    setWeatherSettings((prev) => ({
      ...prev,
      distance:
        prev.distance === DistanceUnit.Kilometers
          ? DistanceUnit.Miles
          : DistanceUnit.Kilometers,
    }));
  };

  const handleChangePressureValue = () => {
    setWeatherSettings((prev) => ({
      ...prev,
      pressure:
        prev.pressure === PressureUnit.Millibar
          ? PressureUnit.InchOfMercury
          : PressureUnit.Millibar,
    }));
  };

  const handleChangeWindSpeedValue = () => {
    setWeatherSettings((prev) => ({
      ...prev,
      windSpeed:
        prev.windSpeed === WindSpeedUnit.KilometersPerHour
          ? WindSpeedUnit.MilesPerHour
          : WindSpeedUnit.KilometersPerHour,
    }));
  };

  return (
    <View className="bg-red-300">
      <View className="flex-col gap-y-2 px-5 py-2">
        <View className="flex-row justify-between items-center">
          <Text>Temperature</Text>
          <Switch
            value={weatherSettings.temp === TemperatureUnit.Celsius}
            onValueChange={handleChangeTempValue}
            // disabled={false}
            activeText={TemperatureUnit.Celsius}
            inActiveText={TemperatureUnit.Fahrenheit}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Distance</Text>
          <Switch
            value={weatherSettings.distance === DistanceUnit.Kilometers}
            onValueChange={handleChangeDistanceValue}
            activeText={DistanceUnit.Kilometers}
            inActiveText={DistanceUnit.Miles}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Pressure</Text>
          <Switch
            value={weatherSettings.pressure === PressureUnit.Millibar}
            onValueChange={handleChangePressureValue}
            activeText={PressureUnit.Millibar}
            inActiveText={PressureUnit.InchOfMercury}
            backgroundActive={"green"}
            backgroundInactive={"gray"}
            circleActiveColor={"#30a566"}
            circleInActiveColor={"#000000"}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Wind Speed</Text>
          <Switch
            value={
              weatherSettings.windSpeed === WindSpeedUnit.KilometersPerHour
            }
            onValueChange={handleChangeWindSpeedValue}
            activeText={WindSpeedUnit.KilometersPerHour}
            inActiveText={WindSpeedUnit.MilesPerHour}
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
