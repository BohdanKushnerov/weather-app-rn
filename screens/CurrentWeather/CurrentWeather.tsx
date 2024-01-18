import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";

import ForecastDays from "./components/ForecastDays";
import CityInput from "./components/CityInput";
import CitiesList from "./components/CitiesList";
import CurrentCityWeatherInfo from "./components/CurrentCityWeatherInfo";
import {
  fetchLocations,
  fetchWeatherCurrent,
  fetchWeatherForecast,
} from "../../api/weather";
import { IAirQuality } from "../../interfaces/IAirQuality";
import AdditionalInfo from "./components/AdditionalInfo";
import AirQuality from "./components/AirQuality";

export interface ILocationWeather {
  name: string;
  region: string;
  country: string;
  localtime: Date;
}

export interface IConditionWeather {
  text: string;
  icon: string;
  code: number;
}

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

export interface ISearchLocation {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

export interface IForecastDay {
  date: Date;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: IConditionWeather;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
  };
}

export interface IForecastData {
  forecastday: IForecastDay[];
}

export interface IForecastWeather {
  location: ILocationWeather;
  current: ICurrentWeather;
  forecast: IForecastData;
}

function isForecastWeatherData(
  data: IForecastWeather
): data is IForecastWeather {
  return (data as IForecastWeather).forecast !== undefined;
}

type WeatherType = "Today" | "Tomorrow" | "10 days";

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [weather, setWeather] = useState<IForecastWeather | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("Today");

  // requestForegroundPermissionsAsync + location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  // if (location) current weather in current location
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      fetchWeatherCurrent({ latitude, longitude }).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  const handleSearchLocations = debounce((search: string) => {
    if (search && search.length > 2)
      fetchLocations({ cityName: search, days: 1 }).then((data) => {
        setSearchLocations(data);
      });
  }, 1000);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickLocation = (location: ISearchLocation) => {
    const { name } = location;

    fetchWeatherForecast({ cityName: name, days: 1 }).then((data) => {
      setWeather(data);
      handleToggleSearch();
    });
  };

  const handleSelectWeather = (selectedWeather: WeatherType) => {
    setSelectedWeather(selectedWeather);
  };

  return (
    <View className="h-screen py-[6%] bg-ligth">
      <View className="relative h-1/2 bg-gray-600 rounded-3xl">
        <CityInput
          showSearch={showSearch}
          handleSearchLocations={handleSearchLocations}
          handleToggleSearch={handleToggleSearch}
        />

        {searchLocations && searchLocations.length > 0 && showSearch ? (
          <CitiesList
            searchLocations={searchLocations}
            handleClickLocation={handleClickLocation}
          />
        ) : null}

        {weather ? (
          <>
            <CurrentCityWeatherInfo weather={weather} />
          </>
        ) : (
          <View>
            <Text className="">Грузиться погода</Text>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}
      </View>

      {/* forecast for next days */}
      {/* {weather && isForecastWeatherData(weather) && weather.forecast && (
        <ForecastDays forecast={weather.forecast} />
      )} */}

      <View className="flex-row justify-between p-[16px]">
        <TouchableOpacity
          className={`px-[35px] py-[9px] rounded-xl ${
            selectedWeather === "Today" ? "bg-btnAccent" : "bg-white"
          } `}
          onPress={() => handleSelectWeather("Today")}
        >
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-[35px] py-[9px] rounded-xl ${
            selectedWeather === "Tomorrow" ? "bg-btnAccent" : "bg-white"
          } `}
          onPress={() => handleSelectWeather("Tomorrow")}
        >
          <Text>Tomorrow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-[35px] py-[9px] rounded-xl ${
            selectedWeather === "10 days" ? "bg-btnAccent" : "bg-white"
          } `}
          onPress={() => handleSelectWeather("10 days")}
        >
          <Text>10 days</Text>
        </TouchableOpacity>
      </View>

      {weather && <AdditionalInfo weather={weather} />}

      {/* {weather && <AirQuality airQuality={weather.current.air_quality} />} */}

      <StatusBar style="dark" />
    </View>
  );
};

export default CurrentWeather;
