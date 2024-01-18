import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
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
import HourlyForecast from "./components/HourForecast";
import SelectWeatherButtons from "./components/SelectWeatherButtons";
import TomorrowCityWeather from "./components/TomorrowCityWeather";

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

export interface IWeatherHour {
  time_epoch: number;
  time: Date;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
  };
  short_rad: number;
  diff_rad: number;
}

export interface IForecastDay {
  date: Date;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: IConditionWeather;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
  };
  hour: IWeatherHour[];
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

export type WeatherType = "Today" | "Tomorrow" | "10 days";

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [currentSearchLocation, setCurrentSearchLocation] = useState<
    string | null
  >(null);
  const [weather, setWeather] = useState<IForecastWeather | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("Today");

  const [tomorrowWeather, setTomorrowWeather] =
    useState<IForecastWeather | null>(null);

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
    if (location && selectedWeather === "Today") {
      const { latitude, longitude } = location.coords;
      fetchWeatherCurrent({ latitude, longitude, days: 1 }).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  useEffect(() => {
    if (selectedWeather === "Tomorrow" && !currentSearchLocation) {
      // тут искать погоду по твоей геолокации на завтра
      if (location) {
        console.log("тут искать погоду по твоей геолокации на завтра");
        const { latitude, longitude } = location.coords;
        fetchWeatherCurrent({ latitude, longitude, days: 2 }).then((data) => {
          const secondDayForecast: IForecastDay[] = [
            data.forecast.forecastday[1],
          ];

          const tomorrowForecast = {
            location: data.location,
            current: data.current,
            forecast: {
              forecastday: secondDayForecast,
            },
          };

          setTomorrowWeather(tomorrowForecast);
          // const secondWeatherForecast = {
          //   location: data.location,
          //   current: data.current,
          //   forecast: {
          //     forecastday: secondDayForecast,
          //   },
          // };
          // console.log('1')
          // console.log("data", data);
        });
      }
    } else if (selectedWeather === "Tomorrow" && currentSearchLocation) {
      console.log(
        "тут искать погоду на завтра по локации что была в поиске на завтра"
      );

      // тут искать погоду на завтра по локации что была в поиске на завтра
    } else if (selectedWeather === "10 days" && !currentSearchLocation) {
      console.log("тут искать погоду по твоей геолокации на 10 дней");

      // тут искать погоду по твоей геолокации на 10 дней
    } else if (selectedWeather === "10 days" && currentSearchLocation) {
      console.log(
        "тут искать погоду на завтра по локации что была в поиске на 10 дней"
      );

      // тут искать погоду на завтра по локации что была в поиске на 10 дней
    }
  }, [selectedWeather, currentSearchLocation]);

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
      setSelectedWeather("Today");
      setCurrentSearchLocation(name);
      handleToggleSearch();
    });
  };

  const handleSelectWeather = (selectedWeather: WeatherType) => {
    setSelectedWeather(selectedWeather);
  };

  return (
    <SafeAreaView className="pt-[7%] bg-ligth">
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <View className="relative h-auto bg-gray-600 rounded-3xl">
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

          {weather && selectedWeather === "Today" && (
            <CurrentCityWeatherInfo weather={weather} />
          )}

          {tomorrowWeather && selectedWeather === "Tomorrow" && (
            <TomorrowCityWeather weather={tomorrowWeather} />
          )}

          {!weather && (
            <View>
              <Text className="">Грузиться погода</Text>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>
          )}
        </View>

        <SelectWeatherButtons
          selectedWeather={selectedWeather}
          handleSelectWeather={handleSelectWeather}
        />

        {weather && <AdditionalInfo weather={weather} />}

        {weather && <HourlyForecast weather={weather} />}

        {/* 7 days  */}
        {/* {weather?.forecast && <ForecastDays forecast={weather?.forecast} />} */}

        {/* forecast for next days */}
        {/* {weather && isForecastWeatherData(weather) && weather.forecast && (
        <ForecastDays forecast={weather.forecast} />
      )} */}

        {/* {weather && <AirQuality airQuality={weather.current.air_quality} />} */}

        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentWeather;
