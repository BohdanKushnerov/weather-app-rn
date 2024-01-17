import { FC, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
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

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [weather, setWeather] = useState<IForecastWeather | null>(null);

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
      fetchLocations({ cityName: search, days: 7 }).then((data) => {
        setSearchLocations(data);
      });
  }, 1200);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickLocation = (location: ISearchLocation) => {
    const { name } = location;

    fetchWeatherForecast({ cityName: name, days: 7 }).then((data) => {
      setWeather(data);
      handleToggleSearch();
    });
  };

  return (
    <SafeAreaView className="h-screen py-[7%] bg-zinc-800">
      <View className="relative">
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
      </View>

      {weather ? (
        <>
          <CurrentCityWeatherInfo weather={weather} />
          {/* <AirQuality airQuality={weather.current.air_quality} /> */}
        </>
      ) : (
        <View>
          <Text>Давай ищи погоду для начала, потому что не пришла</Text>
        </View>
      )}

      {/* forecast for next days */}
      {weather && isForecastWeatherData(weather) && weather.forecast && (
        <ForecastDays forecast={weather.forecast} />
      )}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default CurrentWeather;

{
  /* <FlatList
  data={weather?.forecast?.forecastday}
  renderItem={({ item }) => {
    const date = new Date(item.date);
    const options = { weekday: "long" };
    let dayName = date.toLocaleDateString("en-US", options);
    dayName = dayName.split(",")[0];

    return (
      <>
        <View
          // key={index}  // 'key' should not be used inside FlatList
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          // style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          <Image
            // source={{uri: 'https:'+item?.day?.condition?.icon}}
            source={{ uri: `https:${item?.day?.condition?.icon}` }}
            className="w-11 h-11"
          />
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white text-xl font-semibold">
            {item?.day?.avgtemp_c}&#176;
          </Text>
        </View>
        <View
          // key={index}  // 'key' should not be used inside FlatList
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          // style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          <Image
            // source={{uri: 'https:'+item?.day?.condition?.icon}}
            source={{ uri: `https:${item?.day?.condition?.icon}` }}
            className="w-11 h-11"
          />
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white text-xl font-semibold">
            {item?.day?.avgtemp_c}&#176;
          </Text>
        </View>
      </>
    );
  }}
  keyExtractor={(item) => item.date}
/>; */
}
