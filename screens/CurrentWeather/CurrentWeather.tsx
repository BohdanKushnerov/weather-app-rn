import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ForecastDays from "./components/ForecastDays";
import CityInput from "./components/CityInput";
import CitiesList from "./components/CitiesList";
import LocationCityWeatherInfo from "./components/LocationCityWeatherInfo";
import {
  fetchLocations,
  fetchWeatherCurrent,
  fetchWeatherForecast,
} from "../../api/weather";
import AdditionalInfo from "./components/AdditionalInfo";
import AirQuality from "./components/AirQuality";
import HourlyForecast from "./components/HourForecast";
import SelectWeatherButtons from "./components/SelectWeatherButtons";
import TomorrowCityWeather from "./components/TomorrowCityWeather";
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

export type WeatherType = "Today" | "Tomorrow" | "10 days";

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("Today");
  const [weather, setWeather] = useState<IForecastWeather | null>(null);
  const [tomorrowWeather, setTomorrowWeather] =
    useState<IForecastWeather | null>(null);
  const [tenDays, setTenDays] = useState<IForecastWeather | null>(null);

  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentSearchLocation, setCurrentSearchLocation] = useState<
    string | null
  >(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);

  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

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

  // currentSearchLocation && "Today"
  useEffect(() => {
    if (currentSearchLocation && selectedWeather === "Today") {
      fetchWeatherForecast({ cityName: currentSearchLocation, days: 1 }).then(
        (data) => {
          setWeather(data);
        }
      );
    }
  }, [currentSearchLocation]);

  // "Tomorrow";
  useEffect(() => {
    if (selectedWeather !== "Tomorrow") return;
    if (!currentSearchLocation) {
      // тут искать погоду по твоей геолокации на завтра
      console.log("тут искать погоду по твоей геолокации на завтра");
      if (location) {
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
        });
      }
    } else {
      // тут искать погоду на завтра по локации что была в поиске на завтра

      console.log(
        "тут искать погоду на завтра по локации что была в поиске на завтра"
      );

      fetchWeatherForecast({ cityName: currentSearchLocation, days: 2 }).then(
        (data) => {
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
        }
      );
    }
  }, [selectedWeather, currentSearchLocation]);

  // "10 days"
  useEffect(() => {
    if (selectedWeather !== "10 days") return;

    if (!currentSearchLocation) {
      // тут искать погоду по твоей геолокации на 10 дней
      console.log("тут искать погоду по твоей геолокации на 10 дней");

      if (location) {
        const { latitude, longitude } = location.coords;
        fetchWeatherCurrent({ latitude, longitude, days: 10 }).then((data) => {
          setTenDays(data);
        });
      }
    } else {
      console.log(
        "тут искать погоду на завтра по локации что была в поиске на 10 дней"
      );
      // тут искать погоду на завтра по локации что была в поиске на 10 дней

      fetchWeatherForecast({
        cityName: currentSearchLocation,
        days: 10,
      }).then((data) => {
        setTenDays(data);
      });
    }
  }, [selectedWeather, currentSearchLocation]);

  const handleSearchLocations = debounce((search: string) => {
    if (search && search.length > 2) {
      setIsLoading(true);

      fetchLocations({ cityName: search.trim(), days: 1 })
        .then((data) => {
          setSearchLocations(data);
          setIsLoading(false);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsLoading(false));
    }
  }, 1000);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickLocation = (location: ISearchLocation) => {
    const { name } = location;

    setIsLoading(true);

    fetchWeatherForecast({ cityName: name, days: 1 }).then((data) => {
      setWeather(data);
      setCurrentSearchLocation(name);
      setSelectedWeather("Today");
      setTomorrowWeather(null);
      setTenDays(null);
      setIsLoading(false);
      handleToggleSearch();
      scrollToTop();
    });
  };

  const handleSelectWeather = (selectedWeather: WeatherType) => {
    setSelectedWeather(selectedWeather);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolling(offsetY > 0);
  };

  return (
    <SafeAreaView className="relative h-screen bg-green-100">
      {/* Input + menu */}
      <View className="absolute top-7 right-0 w-full px-1 z-10 flex flex-row items-center justify-end">
        <View className="relative flex-1">
          <CityInput
            isLoading={isLoading}
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

        <TouchableOpacity className="" onPress={scrollToTop}>
          <Entypo name="menu" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <ImageBackground
          source={require("../../assets/valentin-muller-bWtd1ZyEy6w-unsplash.webp")}
          resizeMode="cover"
          style={{
            paddingTop: "5%",
            backgroundColor: "gray",
            width: dimensionsWidth,
            height: dimensionsHeigth / 2,
          }}
        >
          <View className="relative rounded-3xl">
            {(selectedWeather === "Today" || selectedWeather === "10 days") && (
              <LocationCityWeatherInfo weather={weather} />
            )}

            {selectedWeather === "Tomorrow" && (
              <TomorrowCityWeather weather={tomorrowWeather} />
            )}
          </View>
        </ImageBackground>

        <SelectWeatherButtons
          selectedWeather={selectedWeather}
          handleSelectWeather={handleSelectWeather}
        />

        {/* Today */}
        {selectedWeather === "Today" && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <AdditionalInfo weather={weather} />
            <HourlyForecast
              weather={weather}
              selectedWeather={selectedWeather}
            />
          </View>
        )}

        {/* Tomorrow */}
        {selectedWeather === "Tomorrow" && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <AdditionalInfo weather={tomorrowWeather} />
            <HourlyForecast
              weather={tomorrowWeather}
              selectedWeather={selectedWeather}
            />
          </View>
        )}

        {/* 10 days  */}
        {selectedWeather === "10 days" && <ForecastDays weather={tenDays} />}

        {weather && <AirQuality airQuality={weather.current.air_quality} />}

        <StatusBar style="light" />
      </ScrollView>

      {/* Scroll button  */}
      {isScrolling && (
        <TouchableOpacity
          className="absolute bottom-0 right-0 p-4"
          onPress={scrollToTop}
        >
          <Feather name="arrow-up-circle" size={48} color="#858b8692" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default CurrentWeather;
