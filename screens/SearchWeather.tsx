import { FC, useEffect, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CityInput from "@components/CityInput";
import SearchCitiesList from "@components/SearchCitiesList";
import MyLocationWeather from "@components/MyLocationWeather";
import SavedSearchLocations from "@components/SavedSearchLocations";
import {
  fetchCurrentForecast,
  fetchCurrentForecastLocation,
  fetchLocations,
} from "@api/weather";
import { getCurrentLocation } from "@utils/getCurrentLocation";
import { ISearchLocation } from "@interfaces/ISearchLocation";
import { RootStackParamList } from "@customTypes/RootStackParamList";
import { IForecastWeather } from "@interfaces/IForecastWeather";

type SearchWeatherNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchWeather"
>;

interface ISearchWeatherProps {
  navigation: SearchWeatherNavigationProp;
}

interface ISearchHistory {
  name: string;
  region: string;
  country: string;
}

const tempFn = async (city: string) => {
  const weather = await fetchCurrentForecast(city);
  return { temp_c: weather.current.temp_c, temp_f: weather.current.temp_f };
};

const SearchWeather: FC<ISearchWeatherProps> = ({ navigation }) => {
  const [myLocationWeather, setMyLocationWeather] =
    useState<IForecastWeather | null>(null);
  const [searchedCities, setSearchedCities] = useState<
    ISearchLocation[] | null
  >(null);
  const [city, setCity] = useState("");
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  useEffect(() => {
    const getMyLocation = async () => {
      const myLocation = await getCurrentLocation();

      if (myLocation) {
        const { latitude, longitude } = myLocation.coords;

        const currentWeather = await fetchCurrentForecastLocation({
          latitude,
          longitude,
        });

        setMyLocationWeather(currentWeather);
      }
    };

    getMyLocation();
  }, []);

  useEffect(() => {
    const getSearchedCities = async () => {
      const existingDataString: string | null = await AsyncStorage.getItem(
        "search-history"
      );

      const existingArray: ISearchHistory[] = existingDataString
        ? JSON.parse(existingDataString)
        : [];

      if (existingDataString?.length === 0) {
        return;
        // setSavedLocations(existingArray);
      } else {
        const fetchDataForSavedLocations = async () => {
          const weatherPromises = existingArray.map(async (city) => {
            const temp: { temp_c: number; temp_f: number } = await tempFn(
              city.name
            );
            return { ...city, ...temp };
          });

          const citiesInfo = await Promise.all(weatherPromises);
          setSearchedCities(citiesInfo);
        };

        fetchDataForSavedLocations();
      }
    };

    getSearchedCities();
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

        const existingArray: ISearchHistory[] = existingData
          ? JSON.parse(existingData)
          : [];

        const search = existingArray.findIndex(
          (city) => city.name === value.name
        );

        if (search === -1) {
          const newArray = [value, ...existingArray];
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

  const handleDeleteCityFromStorage = async (name: string, region: string) => {
    // AsyncStorage.removeItem("search-history");
    if (searchedCities) {
      const newSearchedCities = searchedCities.filter(
        (city) => city.name !== name && city.region !== region
      );
      setSearchedCities([...newSearchedCities]);
      // console.log("newArr", newArr);
      const jsonValue = JSON.stringify(newSearchedCities);
      await AsyncStorage.setItem("search-history", jsonValue);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        className="bg-mainBcg"
        style={{
          height: dimensionsHeigth - 64 - insets.top,
          width: dimensionsWidth,
          paddingHorizontal: 8,
          paddingTop: 8,
        }}
      >
        <View className="flex-1 relative">
          <CityInput
            isLoading={isLoading}
            city={city}
            handleChangeCity={handleChangeCity}
          />
          {searchLocations && searchLocations.length > 0 ? (
            <SearchCitiesList
              searchLocations={searchLocations}
              handleClickLocation={handleClickLocation}
            />
          ) : null}

          <MyLocationWeather myLocationWeather={myLocationWeather} />

          <SavedSearchLocations
            savedLocations={searchedCities}
            keyboardHide={keyboardHide}
            handleDeleteCityFromStorage={handleDeleteCityFromStorage}
          />
        </View>

        <StatusBar style="dark" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchWeather;
