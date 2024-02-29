import { IForecastWeather } from "./IForecastWeather";
import { Weather } from "@customEnums/Weather";

export interface IHourlyForecastProps {
  weather: IForecastWeather | null;
  selectedWeather: Weather;
}
