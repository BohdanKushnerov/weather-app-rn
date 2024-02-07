import { FC, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import SelectWeatherButtons from "@components/SelectWeatherButtons";
import HeaderCurrentWeather from "@components/HeaderCurrentWeather";
import WeatherMainInfoWithBackground from "@components/WeatherMainInfoWithBackground";
import ScrollUpBtn from "@components/ScrollUpBtn";
import TodayAdditionalWeather from "@components/TodayAdditionalWeather";
import TomorrowAdditionalWeather from "@components/TomorrowAdditionalWeather";
import ForecastTenDays from "@components/ForecastTenDays";
import { fetchWeatherCurrent, fetchWeatherForecast } from "@api/weather";
import { getCurrentLocation } from "@utils/getCurrentLocation";
import { IForecastDay } from "@interfaces/IForecastDay";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { RootStackParamList } from "@customTypes/RootStackParamList";
import { Weather } from "@customEnums/Weather";

type CurrentWeatherRouteProp = RouteProp<RootStackParamList, "CurrentWeather">;

type CurrentWeatherNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CurrentWeather"
>;

interface ICurrentWeatherProps {
  route: CurrentWeatherRouteProp;
  navigation: CurrentWeatherNavigationProp;
}

const CurrentWeather: FC<ICurrentWeatherProps> = ({ route: { params } }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [selectedWeather, setSelectedWeather] = useState<Weather>(
    Weather.Today
  );
  const [weather, setWeather] = useState<IForecastWeather | null>(null);
  const [tomorrowWeather, setTomorrowWeather] =
    useState<IForecastWeather | null>(null);
  const [tenDaysWeather, setTenDaysWeather] = useState<IForecastWeather | null>(
    null
  );
  const [isScrolling, setIsScrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  // const windowDimensions = useWindowDimensions();
  // const insets = useSafeAreaInsets();

  // const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  const [paramCity, setParamCity] = useState("");

  // const qwe = useWeatherContext()

  // console.log('qwe', qwe)

  useEffect(() => {
    if (params) {
      setParamCity(params?.cityName);
    }
  }, [params]);

  const onRefresh = async () => {
    setRefreshing(true);

    scrollToTop();
    // setWeather(null);
    setTomorrowWeather(null);
    setTenDaysWeather(null);

    try {
      const refreshedLocation = await getCurrentLocation();
      setLocation(refreshedLocation);

      const fetchWeather = async (days: number) => {
        if (refreshedLocation) {
          const { latitude, longitude } = refreshedLocation.coords;
          const data = paramCity
            ? await fetchWeatherForecast({ cityName: paramCity, days })
            : await fetchWeatherCurrent({ latitude, longitude, days });

          if (days === 1) {
            setWeather(data);
          } else if (days === 2) {
            const secondDayForecast = [data.forecast.forecastday[1]];
            const tomorrowForecast = {
              location: data.location,
              current: data.current,
              forecast: { forecastday: secondDayForecast },
            };
            setTomorrowWeather(tomorrowForecast);
          } else if (days === 10) {
            setTenDaysWeather(data);
          }
        }
      };

      if (selectedWeather === Weather.Today) {
        await fetchWeather(1);
      } else if (selectedWeather === Weather.Tomorrow) {
        await fetchWeather(2);
      } else if (selectedWeather === Weather.TenDays) {
        await fetchWeather(10);
      }
    } catch (error) {
      console.error("Error while refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // requestForegroundPermissionsAsync + location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          const location = await getCurrentLocation();
          location && setLocation(location);
        } catch (error) {
          console.log("=====error try", error);
        }
      }
    })();
  }, []);

  // if (location) current weather in current location
  useEffect(() => {
    if (location && selectedWeather === Weather.Today && !refreshing) {
      // console.log(
      //   "==========================================11111111111111111111111"
      // );
      const { latitude, longitude } = location.coords;

      fetchWeatherCurrent({ latitude, longitude, days: 1 }).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  // params.cityName && "Today"
  useEffect(() => {
    if (params === undefined) return;
    // console.log("======================================22222222222222222222");

    if (params.cityName && !refreshing) {
      resetWeather();

      fetchWeatherForecast({ cityName: params.cityName, days: 1 }).then(
        (data) => {
          setWeather(data);
        }
      );
    }
  }, [params]);

  // "Tomorrow";
  useEffect(() => {
    if (selectedWeather !== "Tomorrow") return;
    if (!params) {
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

      fetchWeatherForecast({ cityName: params.cityName, days: 2 }).then(
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
  }, [selectedWeather, params]);

  // "10 days"
  useEffect(() => {
    if (selectedWeather !== "10 days") return;

    if (!params) {
      // тут искать погоду по твоей геолокации на 10 дней
      console.log("тут искать погоду по твоей геолокации на 10 дней");

      if (location) {
        const { latitude, longitude } = location.coords;
        fetchWeatherCurrent({ latitude, longitude, days: 10 }).then((data) => {
          setTenDaysWeather(data);
        });
      }
    } else {
      console.log(
        "тут искать погоду на завтра по локации что была в поиске на 10 дней"
      );
      // тут искать погоду на завтра по локации что была в поиске на 10 дней

      fetchWeatherForecast({
        cityName: params.cityName,
        days: 10,
      }).then((data) => {
        setTenDaysWeather(data);
      });
    }
  }, [selectedWeather, params]);

  const handleSelectWeather = (selectedWeather: Weather) => {
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

  const resetWeather = () => {
    scrollToTop();
    setSelectedWeather(Weather.Today);
    setWeather(null);
    setTomorrowWeather(null);
    setTenDaysWeather(null);
  };

  return (
    <View className="relative bg-green-100">
      {/* goSearch + menu */}
      <HeaderCurrentWeather weather={weather} />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={1000}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <WeatherMainInfoWithBackground
          weather={weather}
          tomorrowWeather={tomorrowWeather}
          selectedWeather={selectedWeather}
        />

        <SelectWeatherButtons
          selectedWeather={selectedWeather}
          handleSelectWeather={handleSelectWeather}
        />

        {/* Today */}
        {selectedWeather === Weather.Today && (
          <TodayAdditionalWeather
            weather={weather}
            selectedWeather={selectedWeather}
          />
        )}

        {/* Tomorrow */}
        {selectedWeather === Weather.Tomorrow && (
          <TomorrowAdditionalWeather
            tomorrowWeather={tomorrowWeather}
            selectedWeather={selectedWeather}
          />
        )}

        {/* 10 days  */}
        {selectedWeather === Weather.TenDays && (
          <ForecastTenDays weather={tenDaysWeather} />
        )}

        <StatusBar style="light" />
      </ScrollView>

      {/* Scroll button  */}
      {isScrolling && <ScrollUpBtn scrollToTop={scrollToTop} />}
    </View>
  );
};

export default CurrentWeather;
