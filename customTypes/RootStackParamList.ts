import { WeatherType } from "@customTypes/WeatherType";

export type RootStackParamList = {
  CurrentWeather: { cityName: string } | undefined;
  SearchWeather: {
    handleSelectWeather: (string: WeatherType) => void;
    resetWeather: () => void;
    scrollToTop: () => void;
  };
  AirQuality: {};
  Settings: {};
};
