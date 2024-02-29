import { Theme } from "@customEnums/Theme";
import { Language } from "@customEnums/Language";
import { TemperatureUnit } from "@customEnums/TemperatureUnit";
import { DistanceUnit } from "@customEnums/DistanceUnit";
import { PressureUnit } from "@customEnums/PressureUnit";
import { WindSpeedUnit } from "@customEnums/WindSpeedUnit";

export interface IWeatherSettings {
  theme: Theme.Light | Theme.Dark;
  lang: Language.English | Language.Ukrainian | Language.French;
  temp: TemperatureUnit.Celsius | TemperatureUnit.Fahrenheit;
  distance: DistanceUnit.Kilometers | DistanceUnit.Miles;
  pressure: PressureUnit.Millibar | PressureUnit.InchOfMercury;
  windSpeed: WindSpeedUnit.KilometersPerHour | WindSpeedUnit.MilesPerHour;
}
