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
import CitiesList from "@components/CitiesList";
import MyLocationWeather from "@components/MyLocationWeather";
import SavedLocations from "@components/SavedSearchLocations";
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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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

  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  useEffect(() => {
    const showSubBtns = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubBtns = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubBtns.remove();
      hideSubBtns.remove();
    };
  }, []);

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
    const getSavedLocations = async () => {
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

          const cityInfo = await Promise.all(weatherPromises);
          setSavedLocations(cityInfo);
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
    if (savedLocations) {
      const newArr = savedLocations.filter(
        (city) => city.name !== name && city.region !== region
      );
      setSavedLocations([...newArr]);
      // console.log("newArr", newArr);
      const jsonValue = JSON.stringify(newArr);
      await AsyncStorage.setItem("search-history", jsonValue);
    }
  };

  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        className="bg-green-100"
        style={{
          height: dimensionsHeigth - 64 - insets.top,
          width: dimensionsWidth,
          paddingHorizontal: 8,
          paddingTop: 8,
          // paddingBottom: 8,
        }}
      >
        <View className="flex-1 relative">
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

          <MyLocationWeather myLocationWeather={myLocationWeather} />

          <SavedLocations
            savedLocations={savedLocations}
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
