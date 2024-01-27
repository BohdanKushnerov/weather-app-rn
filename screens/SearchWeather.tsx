import { FC, useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CityInput from "@components/CityInput";
import CitiesList from "@components/CitiesList";
import LoaderComponent from "@components/LoaderComponent";
import {
  fetchCurrentForecast,
  fetchCurrentForecastLocation,
  fetchLocations,
} from "@api/weather";
import { TemperatureUnit, useWeatherContext } from "@context/WeatherContext";
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

const SearchWeather: FC<ISearchWeatherProps> = ({
  navigation,
}) => {
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
  const [isEdit, setEdit] = useState(false);

  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth, height: dimensionsHeigth } = windowDimensions;

  const { weatherSettings } = useWeatherContext();

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
    setIsShowKeyboard(false);
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
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <View className="flex-1 relative ">
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
            <View className="flex-row items-center gap-x-2 p-2">
              <Entypo name="home" size={24} color="black" />
              <Text className="font-[SoraBold] text-base tracking-[0.25px] leading-5">
                Current location weather
              </Text>
            </View>
            {myLocationWeather ? (
              <TouchableOpacity
                className="w-full flex-row justify-between items-center py-2 px-4 bg-gray-300 rounded-md border"
                onPress={() =>
                  navigation.navigate("CurrentWeather", {
                    cityName: myLocationWeather?.location.name,
                  })
                }
              >
                <View className="flex-col">
                  <Text className="font-[SoraSemiBold] text-base tracking-[0.25px] leading-5">
                    {myLocationWeather?.location.name}
                  </Text>
                  <View className="flex-row">
                    <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                      {myLocationWeather?.location.region},
                    </Text>
                    <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                      {myLocationWeather?.location.country}
                    </Text>
                  </View>
                </View>
                <Text className="font-[SoraBold] text-2xl tracking-[0.25px] leading-10">
                  {/* {myLocationWeather?.current.temp_c}&#176; */}
                  {weatherSettings.temp === TemperatureUnit.Celsius
                    ? myLocationWeather?.current.temp_c
                    : myLocationWeather?.current.temp_f}{" "}
                  {weatherSettings.temp}
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="h-[50px]">
                <LoaderComponent />
              </View>
            )}
          </View>

          {savedLocations ? (
            <View className="relative flex-1 flex-col items-center">
              <View className="flex-row items-center gap-x-2 p-2">
                <FontAwesome name="history" size={24} color="black" />
                <Text className="font-[SoraBold] text-lg tracking-[0.25px] leading-5">
                  History locations
                </Text>
              </View>
              {savedLocations.length > 0 && (
                <TouchableOpacity
                  className={`absolute top-1 right-0 py-2 px-4 flex-row gap-x-1 border rounded-md ${
                    isEdit && "border-red-500"
                  }`}
                  onPress={() => {
                    setEdit((prev) => !prev);
                    keyboardHide();
                  }}
                >
                  <Entypo
                    name="edit"
                    size={16}
                    color={isEdit ? "red" : "black"}
                  />
                  <Text
                    className={`font-[SoraSemiBold] text-base tracking-[0.25px] leading-5 ${
                      isEdit && "text-red-500 border-red-500"
                    }`}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              )}

              <ScrollView
                style={{ width: dimensionsWidth, height: 300, flexGrow: 1 }}
                contentContainerStyle={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  paddingHorizontal: 8,
                }}
              >
                {savedLocations?.map((loc) => {
                  return (
                    <View
                      className="flex-row justify-between bg-green-200 rounded-xl border border-green-400"
                      key={loc.name}
                    >
                      <TouchableOpacity
                        className={`${
                          // "w-full"
                          isEdit ? "w-[85%]" : "w-full"
                        } flex-row justify-between items-center py-2 px-4`}
                        onPress={() => {
                          keyboardHide();
                          navigation.navigate("CurrentWeather", {
                            cityName: loc.name,
                          });
                        }}
                        // disabled={isEdit}
                      >
                        <View className="flex-col">
                          <Text className="font-[SoraSemiBold] text-base tracking-[0.25px] leading-5">
                            {loc.name}
                          </Text>
                          <View className="flex-row">
                            <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                              {loc.region},
                            </Text>
                            <Text className="font-[SoraRegular] text-base tracking-[0.25px] leading-5">
                              {loc.country}
                            </Text>
                          </View>
                        </View>
                        <Text className="font-[SoraBold] text-2xl tracking-[0.25px] leading-10">
                          {weatherSettings.temp === TemperatureUnit.Celsius
                            ? loc.temp_c
                            : loc.temp_f}{" "}
                          {weatherSettings.temp}
                        </Text>
                      </TouchableOpacity>

                      {isEdit && (
                        <TouchableOpacity
                          className={`w-[15%] flex justify-center items-center py-2 rounded-md border ${
                            isEdit && "bg-red-50 border-red-500"
                          }`}
                          onPress={() =>
                            handleDeleteCityFromStorage(loc.name, loc.region)
                          }
                        >
                          <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                      )}
                    </View>
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
    </TouchableWithoutFeedback>
  );
};

export default SearchWeather;
