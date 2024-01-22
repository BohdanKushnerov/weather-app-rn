import { FC, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import CityInput from "@components/CityInput";
import CitiesList from "@components/CitiesList";
import {
  fetchCurrentForecast,
  fetchCurrentForecastLocation,
  fetchLocations,
} from "@api/weather";
import { ISearchLocation } from "@interfaces/ISearchLocation";
import { RootStackParamList } from "@customTypes/RootStackParamList";
import LoaderComponent from "@components/LoaderComponent";
import { getCurrentLocation } from "@utils/getCurrentLocation";
import { IForecastWeather } from "@interfaces/IForecastWeather";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchWeatherRouteProp = RouteProp<RootStackParamList, "SearchWeather">;

type SearchWeatherNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchWeather"
>;

interface ISearchWeatherProps {
  route: SearchWeatherRouteProp;
  navigation: SearchWeatherNavigationProp;
}

interface ISearchHistory {
  name: string;
  region: string;
  country: string;
}

const tempFn = async (city: string) => {
  const weather = await fetchCurrentForecast(city);
  return weather.current.temp_c;
};

const SearchWeather: FC<ISearchWeatherProps> = ({
  route: { params },
  navigation,
}) => {
  const [myLocationWeather, setMyLocationWeather] =
    useState<IForecastWeather | null>(null);
  const [savedLocations, setSavedLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [city, setCity] = useState("");
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const windowDimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  console.log("myLocationWeather", myLocationWeather);

  useEffect(() => {
    const getMyLocation = async () => {
      const myLocation = await getCurrentLocation();

      const { latitude, longitude } = myLocation.coords;

      const currentWeather = await fetchCurrentForecastLocation({
        latitude,
        longitude,
      });

      setMyLocationWeather(currentWeather);
    };

    getMyLocation();
  }, []);

  useEffect(() => {
    const getSavedLocations = async () => {
      const existingDataString: string | null = await AsyncStorage.getItem(
        "search-history"
      );
      console.log("existingData", existingDataString);

      const existingArray: ISearchHistory[] = existingDataString
        ? JSON.parse(existingDataString)
        : [];

      if (existingDataString?.length === 0) {
        return;
        // setSavedLocations(existingArray);
      } else {
        const fetchDataForSavedLocations = async () => {
          const weatherPromises = existingArray.map(async (city) => {
            const temp: number = await tempFn(city.name);
            return { ...city, temp_c: temp };
          });

          const cityInfo = await Promise.all(weatherPromises);
          setSavedLocations(cityInfo);
          console.log("cityInfo", cityInfo);
        };

        fetchDataForSavedLocations();
      }
    };

    getSavedLocations();
  }, []);

  useEffect(() => {
    const searchLocations = (search: string) => {
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
    };

    searchLocations(city);
  }, [city]);

  const handleClickLocation = (location: ISearchLocation) => {
    const { name, region, country } = location;

    const storeData = async (value: ISearchHistory) => {
      try {
        // AsyncStorage.removeItem("search-history");
        const existingData = await AsyncStorage.getItem("search-history");
        console.log("existingData", existingData);

        const existingArray: ISearchHistory[] = existingData
          ? JSON.parse(existingData)
          : [];
        console.log("existingArray", existingArray);

        const search = existingArray.findIndex(
          (city) => city.name === value.name
        );
        console.log("search", search);

        if (search === -1) {
          const newArray = [...existingArray, value];
          const jsonValue = JSON.stringify(newArray);
          await AsyncStorage.setItem("search-history", jsonValue);
        } else {
          return;
        }
      } catch (e) {
        console.log("e", e);
      }
    };

    storeData({ name, region, country });

    navigation.navigate("CurrentWeather", { cityName: name });
  };

  const handleChangeCity = (city: string, resetLocations?: boolean) => {
    setCity(city);

    if (resetLocations) {
      setSearchLocations(null);
    }
  };

  return (
    <View
      style={{
        height: dimensionsHeigth - 64 - insets.top,
        paddingBottom: 16,
        backgroundColor: "green",
      }}
    >
      <View className="flex-1 relative bg-green-100">
        <CityInput
          isLoading={isLoading}
          city={city}
          handleChangeCity={handleChangeCity}
        />
        {searchLocations && searchLocations.length > 0 ? (
          <CitiesList
            searchLocations={searchLocations}
            handleClickLocation={handleClickLocation}
          />
        ) : null}

        <View className="flex-col items-center">
          <View className="flex-row items-center gap-x-2">
            <Entypo name="home" size={24} color="black" />
            {/* <Text>Current position</Text> */}
            <Text>Current weather</Text>
          </View>
          <TouchableOpacity
            className="w-full flex-row justify-between items-center py-2 px-4 bg-gray-400 rounded-md border"
            onPress={() =>
              navigation.navigate("CurrentWeather", {
                cityName: params.name,
              })
            }
          >
            <View className="flex-col">
              <Text>{myLocationWeather?.location.name}</Text>
              <View className="flex-row">
                <Text>{myLocationWeather?.location.region}, </Text>
                <Text>{myLocationWeather?.location.country}</Text>
              </View>
            </View>
            <Text>{myLocationWeather?.current.temp_c}&#176;</Text>
          </TouchableOpacity>
        </View>

        {savedLocations ? (
          <View className="flex-1 flex-col items-center">
            <View className="flex-row items-center gap-x-2">
              <FontAwesome name="history" size={24} color="black" />
              <Text>History locations</Text>
            </View>

            <ScrollView
              style={{ width: dimensionsWidth, height: 300, flexGrow: 1 }}
              contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {savedLocations?.map((loc) => {
                return (
                  <TouchableOpacity
                    className="flex-row justify-between items-center py-2 px-4 bg-gray-400 rounded-md border"
                    key={loc.name}
                    onPress={() =>
                      navigation.navigate("CurrentWeather", {
                        cityName: loc.name,
                      })
                    }
                  >
                    <View className="flex-col">
                      <Text>{loc.name}</Text>
                      <View className="flex-row">
                        <Text>{loc.region}, </Text>
                        <Text>{loc.country}</Text>
                      </View>
                    </View>
                    <Text>{loc.temp_c}&#176;</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <View className="h-[100px]">
            <LoaderComponent />
          </View>
        )}
      </View>

      <StatusBar style="dark" />
    </View>
  );
};

export default SearchWeather;
