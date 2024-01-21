import { IConditionWeather } from "./IConditionWeather";
import { IAirQuality } from "./IAirQuality";

export interface ICurrentWeather {
  last_updated: Date;
  temp_c: number;
  temp_f: number;
  condition: IConditionWeather;
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  air_quality: IAirQuality;
}
