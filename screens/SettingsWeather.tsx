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
import SettingsSwitcher from "@components/SettingsSwitcher";

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
    <View className="bg-green-100 h-screen">
      <View className="flex-col p-2">
        <SettingsSwitcher
          name="Temperature"
          value={weatherSettings.temp === TemperatureUnit.Celsius}
          handleChange={handleChangeTempValue}
          activeText={TemperatureUnit.Celsius}
          inActiveText={TemperatureUnit.Fahrenheit}
        />

        <SettingsSwitcher
          name="Distance"
          value={weatherSettings.distance === DistanceUnit.Kilometers}
          handleChange={handleChangeDistanceValue}
          activeText={DistanceUnit.Kilometers}
          inActiveText={DistanceUnit.Miles}
        />

        <SettingsSwitcher
          name="Pressure"
          value={weatherSettings.pressure === PressureUnit.Millibar}
          handleChange={handleChangePressureValue}
          activeText={PressureUnit.Millibar}
          inActiveText={PressureUnit.InchOfMercury}
        />

        <SettingsSwitcher
          name="Wind Speed"
          value={weatherSettings.windSpeed === WindSpeedUnit.KilometersPerHour}
          handleChange={handleChangeWindSpeedValue}
          activeText={WindSpeedUnit.KilometersPerHour}
          inActiveText={WindSpeedUnit.MilesPerHour}
        />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default SettingsWeather;
