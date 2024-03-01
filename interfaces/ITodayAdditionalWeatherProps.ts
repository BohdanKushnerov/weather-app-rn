import { IForecastWeather } from "./IForecastWeather";
import { Weather } from "@customEnums/Weather";

export interface ITodayAdditionalWeatherProps {
  weather: IForecastWeather | null;
  selectedWeather: Weather;
}
