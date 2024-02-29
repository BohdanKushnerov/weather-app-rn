import { IWeatherSettings } from "./IWeatherSettings";
import { Theme } from "@customEnums/Theme";
import { Language } from "@customEnums/Language";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";
import { DistanceUnit } from "@customEnums/DistanceUnit";
import { PressureUnit } from "@customEnums/PressureUnit";
import { WindSpeedUnit } from "@customEnums/WindSpeedUnit";

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
