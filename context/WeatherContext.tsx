import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Theme } from "@customEnums/Theme";
import { Language } from "@customEnums/Language";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";
import { DistanceUnit } from "@customEnums/DistanceUnit";
import { PressureUnit } from "@customEnums/PressureUnit";
import { WindSpeedUnit } from "@customEnums/WindSpeedUnit";
import { IWeatherContext } from "@interfaces/context/IWeatherContext";
import { IWeatherSettings } from "@interfaces/context/IWeatherSettings";
import { IWeatherContextProvider } from "@interfaces/context/IWeatherContextProvider";

const contextInitialState = {
  theme: Theme.Light,
  lang: Language.English,
  temp: TemperatureUnit.Celsius,
  distance: DistanceUnit.Kilometers,
  pressure: PressureUnit.Millibar,
  windSpeed: WindSpeedUnit.KilometersPerHour,
};

const WeatherContext = createContext<IWeatherContext>({
  weatherSettings: contextInitialState,
  setWeatherSettings: () => {},
});

const WeatherContextProvider: FC<IWeatherContextProvider> = ({ children }) => {
  const [weatherSettings, setWeatherSettings] =
    useState<IWeatherSettings>(contextInitialState);

  const memoizedWeatherValues = useMemo(
    () => ({
      weatherSettings,
      setWeatherSettings,
    }),
    [weatherSettings]
  );

  useEffect(() => {
    const getWeatherStorageSettings = async () => {
      const storageWeatherSettings = await AsyncStorage.getItem(
        "weatherSettings"
      );

      const existingObject: IWeatherSettings = storageWeatherSettings
        ? JSON.parse(storageWeatherSettings)
        : contextInitialState;

      setWeatherSettings(existingObject);
    };

    getWeatherStorageSettings();
  }, []);

  useEffect(() => {
    const saveToStorage = async () => {
      const jsonValue = JSON.stringify(weatherSettings);
      await AsyncStorage.setItem("weatherSettings", jsonValue);
    };

    saveToStorage();
  }, [weatherSettings]);

  return (
    <WeatherContext.Provider value={memoizedWeatherValues}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherContext = () => useContext(WeatherContext);

export { WeatherContextProvider, useWeatherContext };
