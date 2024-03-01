import { Weather } from "@customEnums/Weather";

export interface ISelectWeatherButtonsProps {
  selectedWeather: Weather;
  handleSelectWeather: (selectedWeather: Weather) => void;
}
