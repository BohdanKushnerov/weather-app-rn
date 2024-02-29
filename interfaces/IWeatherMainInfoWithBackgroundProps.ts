import { IForecastWeather } from "./IForecastWeather";
import { Weather } from "@customEnums/Weather";

export interface IWeatherMainInfoWithBackgroundProps {
  weather: IForecastWeather | null;
  tomorrowWeather: IForecastWeather | null;
  selectedWeather: Weather;
}
