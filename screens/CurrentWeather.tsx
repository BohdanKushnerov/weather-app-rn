import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ForecastDays from "@components/ForecastDays";
import LocationCityWeatherInfo from "@components/LocationCityWeatherInfo";
import AdditionalInfo from "@components/AdditionalInfo";
import AirQuality from "@components/AirQuality";
import HourlyForecast from "@components/HourForecast";
import SelectWeatherButtons from "@components/SelectWeatherButtons";
import TomorrowCityWeather from "@components/TomorrowCityWeather";
import LoaderComponent from "@components/LoaderComponent";
import { fetchWeatherCurrent, fetchWeatherForecast } from "@api/weather";
import { getTime } from "@utils/getTime";
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

const CurrentWeather: FC<ICurrentWeatherProps> = ({
  route: { params },
  navigation,
}) => {
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
  const windowDimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Reset state to initial values
      setLocation(null);
      setSelectedWeather(Weather.Today);
      setWeather(null);
      setTomorrowWeather(null);
      setTenDaysWeather(null);

      // Fetch new data from the server or any other data source
      // Example: Refetch current weather data based on the user's location
      const refreshedLocation = await getCurrentLocation();
      setLocation(refreshedLocation);

      if (refreshedLocation && selectedWeather === Weather.Today) {
        const { latitude, longitude } = refreshedLocation.coords;
        const data = await fetchWeatherCurrent({
          latitude,
          longitude,
          days: 1,
        });
        setWeather(data);
      }

      // Additional logic for other weather types (Tomorrow, 10 days) if needed...
    } catch (error) {
      console.error("Error while refreshing:", error);
    } finally {
      // After refreshing, set refreshing to false
      setRefreshing(false);
    }
  }, [selectedWeather]);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);

  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);

  // requestForegroundPermissionsAsync + location
  useEffect(() => {
    (async () => {
      console.log("requestForegroundPermissionsAsync");

      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("status", status);
      if (status === "granted") {
        try {
          // Location.getCurrentPositionAsync({
          //   accuracy: Location.Accuracy.Balanced,
          // })
          //   .then((location) => {
          //     console.log("location", location);
          //     setLocation(location);
          //   })
          //   .catch((err) => console.log("====err then", err))
          //   .finally(() => console.log("finally"));
          // function getCurrentLocation() {
          //   const timeout = 5000;
          //   return new Promise(async (resolve, reject) => {
          //     setTimeout(() => {
          //       reject(
          //         new Error(
          //           `Error getting gps location after ${(timeout * 2) / 1000} s`
          //         )
          //       );
          //     }, timeout * 2);
          //     setTimeout(async () => {
          //       resolve(await Location.getLastKnownPositionAsync());
          //       console.log("getLastKnownPositionAsync", 1);
          //     }, timeout);
          //     resolve(await Location.getCurrentPositionAsync());
          //     console.log("getCurrentPositionAsync", 2);
          //   });
          // }
          const location = await getCurrentLocation();
          console.log("first", location);
          location && setLocation(location);
        } catch (error) {
          console.log("=====error try", error);
        }
      }
    })();
  }, []);

  // if (location) current weather in current location
  useEffect(() => {
    if (location && selectedWeather === Weather.Today) {
      const { latitude, longitude } = location.coords;

      fetchWeatherCurrent({ latitude, longitude, days: 1 }).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  // params.cityName && "Today"
  useEffect(() => {
    if (params === undefined) return;
    resetWeather();
    if (params.cityName) {
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
    <View className="relative h-screen bg-green-100">
      {/* goSearch + menu */}
      <View
        className={`w-full p-2 z-10 flex flex-row items-center justify-between bg-gray-700/50 rounded-3xl`}
        style={{
          position: "absolute",
          top: insets.top,
          right: 0,
        }}
      >
        {weather ? (
          <View className="flex-col">
            <Text
              className="font-[SoraBold] text-white text-3xl"
              style={{
                flex: 1,
                maxWidth: `${80}%`, // Adjust the percentage as needed
              }}
            >
              {weather.location.name}, {weather.location.country}
            </Text>
            {/* <Text className="font-[SoraBold] text-white text-3xl"></Text> */}

            <Text className="text-white text-base font-medium">
              Last update weather: {getTime(weather.current.last_updated)}
            </Text>
          </View>
        ) : (
          <LoaderComponent />
        )}

        <View className="w-[20%] flex-row gap-x-2 items-center justify-end">
          {
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchWeather", {
                  name: weather.location.name,
                  region: weather.location.region,
                  country: weather.location.country,
                  temp: weather.current.temp_c,
                })
              }
              className="p-2"
            >
              <Fontisto name="search" size={24} color="white" />
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsWeather", {})}
            className="p-2"
          >
            <Entypo name="menu" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>

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
        <ImageBackground
          source={require("../assets/valentin-muller-bWtd1ZyEy6w-unsplash.jpg")}
          resizeMode="cover"
          style={{
            paddingTop: "5%",
            backgroundColor: "gray",
            width: dimensionsWidth,
            height: dimensionsHeigth / 1.5,
          }}
        >
          <View className="relative rounded-3xl">
            {(selectedWeather === Weather.Today ||
              selectedWeather === Weather.TenDays) && (
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
        {selectedWeather === Weather.Today && (
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
            {weather ? (
              <AirQuality airQuality={weather.current.air_quality} />
            ) : (
              <LoaderComponent />
            )}
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

            {tomorrowWeather ? (
              <AirQuality
                airQuality={
                  tomorrowWeather?.forecast.forecastday[0].day.air_quality
                }
              />
            ) : (
              <LoaderComponent />
            )}
          </View>
        )}

        {/* 10 days  */}
        {selectedWeather === "10 days" && (
          <ForecastDays weather={tenDaysWeather} />
        )}

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
    </View>
  );
};

export default CurrentWeather;
