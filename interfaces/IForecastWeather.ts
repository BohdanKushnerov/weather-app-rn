import { ILocationWeather } from "./ILocationWeather";
import { ICurrentWeather } from "./ICurrentWeather";
import { IForecastData } from "./IForecastData";

export interface IForecastWeather {
  location: ILocationWeather;
  current: ICurrentWeather;
  forecast: IForecastData;
}
