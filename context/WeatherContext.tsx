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

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum Language {
  Ukrainian = "ua",
  English = "en",
  French = "fr",
}

export enum TemperatureUnit {
  Celsius = `${"\u00b0"}C`,
  Fahrenheit = `${"\u00b0"}F`,
}

export enum DistanceUnit {
  Kilometers = "km",
  Miles = "ml",
}

export enum PressureUnit {
  Millibar = "mBar",
  InchOfMercury = "inHg",
}

export enum WindSpeedUnit {
  KilometersPerHour = "k/h",
  MilesPerHour = "mhp",
}

export interface IWeatherSettings {
  theme: Theme.Light | Theme.Dark;
  lang: Language.English | Language.Ukrainian | Language.French;
  temp: TemperatureUnit.Celsius | TemperatureUnit.Fahrenheit;
  distance: DistanceUnit.Kilometers | DistanceUnit.Miles;
  pressure: PressureUnit.Millibar | PressureUnit.InchOfMercury;
  windSpeed: WindSpeedUnit.KilometersPerHour | WindSpeedUnit.MilesPerHour;
}

const contextInitialState = {
  theme: Theme.Light,
  lang: Language.English,
  temp: TemperatureUnit.Celsius,
  distance: DistanceUnit.Kilometers,
  pressure: PressureUnit.Millibar,
  windSpeed: WindSpeedUnit.KilometersPerHour,
};

export interface IWeatherContext {
  weatherSettings: IWeatherSettings;
  setWeatherSettings: React.Dispatch<
    React.SetStateAction<{
      theme: Theme;
      lang: Language;
      temp: TemperatureUnit;
      distance: DistanceUnit;
      pressure: PressureUnit;
      windSpeed: WindSpeedUnit;
    }>
  >;
}

const WeatherContext = createContext<IWeatherContext>({
  weatherSettings: contextInitialState,
  setWeatherSettings: () => {},
});

interface IWeatherContextProvider {
  children: ReactNode;
}

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
      console.log("fn1");

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
      console.log("fn2");
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
