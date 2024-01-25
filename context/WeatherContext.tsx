import { createContext, FC, ReactNode, useContext, useState } from "react";

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

export interface WeatherSettings {
  weatherSettings: {
    theme: Theme.Light | Theme.Dark;
    lang: Language.English | Language.Ukrainian | Language.French;
    temp: TemperatureUnit.Celsius | TemperatureUnit.Fahrenheit;
    distance: DistanceUnit.Kilometers | DistanceUnit.Miles;
    pressure: PressureUnit.Millibar | PressureUnit.InchOfMercury;
    windSpeed: WindSpeedUnit.KilometersPerHour | WindSpeedUnit.MilesPerHour;
  };
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

const contextInitialState = {
  theme: Theme.Light,
  lang: Language.English,
  temp: TemperatureUnit.Celsius,
  distance: DistanceUnit.Kilometers,
  pressure: PressureUnit.Millibar,
  windSpeed: WindSpeedUnit.KilometersPerHour,
};

const WeatherContext = createContext<WeatherSettings>({
  weatherSettings: contextInitialState,
  setWeatherSettings: () => {},
});

interface IWeatherContextProvider {
  children: ReactNode;
}

const WeatherContextProvider: FC<IWeatherContextProvider> = ({ children }) => {
  const [weatherSettings, setWeatherSettings] = useState(contextInitialState);

  return (
    <WeatherContext.Provider value={{ weatherSettings, setWeatherSettings }}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherContext = () => useContext(WeatherContext);

export { WeatherContextProvider, useWeatherContext };
