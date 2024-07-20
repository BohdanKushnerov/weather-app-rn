import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import SettingsSwitcherBtn from "@components/Buttons/SettingsSwitcherBtn";
import { useWeatherContext } from "@context/WeatherContext";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";
import { DistanceUnit } from "@customEnums/DistanceUnit";
import { PressureUnit } from "@customEnums/PressureUnit";
import { WindSpeedUnit } from "@customEnums/WindSpeedUnit";

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
    <View className="bg-mainBcg h-screen">
      <View className="flex-col p-2">
        <SettingsSwitcherBtn
          name="Temperature"
          value={weatherSettings.temp === TemperatureUnit.Celsius}
          handleChange={handleChangeTempValue}
          activeText={TemperatureUnit.Celsius}
          inActiveText={TemperatureUnit.Fahrenheit}
        />

        <SettingsSwitcherBtn
          name="Distance"
          value={weatherSettings.distance === DistanceUnit.Kilometers}
          handleChange={handleChangeDistanceValue}
          activeText={DistanceUnit.Kilometers}
          inActiveText={DistanceUnit.Miles}
        />

        <SettingsSwitcherBtn
          name="Pressure"
          value={weatherSettings.pressure === PressureUnit.Millibar}
          handleChange={handleChangePressureValue}
          activeText={PressureUnit.Millibar}
          inActiveText={PressureUnit.InchOfMercury}
        />

        <SettingsSwitcherBtn
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
