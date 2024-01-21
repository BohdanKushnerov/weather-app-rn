import { IAirQuality } from "./IAirQuality";
import { IConditionWeather } from "./IConditionWeather";
import { IWeatherHour } from "./IWeatherHour";

export interface IForecastDay {
  date: Date;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: IConditionWeather;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    air_quality: IAirQuality;
  };
  hour: IWeatherHour[];
}
