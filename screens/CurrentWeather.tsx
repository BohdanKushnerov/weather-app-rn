import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ForecastDays from "@components/ForecastDays";
import LocationCityWeatherInfo from "@components/LocationCityWeatherInfo";
import AdditionalInfo from "@components/AdditionalInfo";
import AirQuality from "@components/AirQuality";
import HourlyForecast from "@components/HourForecast";
import SelectWeatherButtons from "@components/SelectWeatherButtons";
import TomorrowCityWeather from "@components/TomorrowCityWeather";
import { fetchWeatherCurrent, fetchWeatherForecast } from "@api/weather";
import { IForecastDay } from "@interfaces/IForecastDay";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { RootStackParamList } from "@customTypes/RootStackParamList";
import { WeatherType } from "@customTypes/WeatherType";

type CurrentWeatherRouteProp = RouteProp<RootStackParamList, "CurrentWeather">;

type CurrentWeatherNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CurrentWeather"
>;

interface ICurrentWeatherProps {
  route: CurrentWeatherRouteProp;
  navigation: CurrentWeatherNavigationProp;
}

const CurrentWeather: FC<ICurrentWeatherProps> = ({
  route: { params },
  navigation,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("Today");

  const [weather, setWeather] = useState<IForecastWeather | null>(null);
  const [tomorrowWeather, setTomorrowWeather] =
    useState<IForecastWeather | null>(null);
  const [tenDaysWeather, setTenDaysWeather] = useState<IForecastWeather | null>(
    null
  );

  // const [currentSearchLocation, setCurrentSearchLocation] = useState<
  //   string | null
  // >(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const resetWeather = () => {
    setWeather(null);
    setTomorrowWeather(null);
    setTenDaysWeather(null);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // console.log("navigation", navigation);
  console.log("params", params);

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
    if (params === undefined) return;
    if (params.cityName && selectedWeather === "Today") {
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
      {/* goSearch + menu */}
      <View className="absolute top-7 right-0 w-full px-1 z-10 flex flex-row items-center justify-end gap-y-5">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SearchWeather", {
              handleSelectWeather,
              resetWeather,
              scrollToTop,
            })
          }
          className="p-2"
        >
          <Fontisto name="search" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="p-2" onPress={scrollToTop}>
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
          source={require("../assets/valentin-muller-bWtd1ZyEy6w-unsplash.jpg")}
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
        {selectedWeather === "10 days" && (
          <ForecastDays weather={tenDaysWeather} />
        )}

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
