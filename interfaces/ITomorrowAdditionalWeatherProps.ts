import { IForecastWeather } from "./IForecastWeather";
import { Weather } from "@customEnums/Weather";

export interface ITomorrowAdditionalWeatherProps {
  tomorrowWeather: IForecastWeather | null;
  selectedWeather: Weather;
}
