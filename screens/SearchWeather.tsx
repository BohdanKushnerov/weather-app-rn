import { FC, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import CityInput from "@components/CityInput";
import CitiesList from "@components/CitiesList";
import { fetchLocations } from "@api/weather";
import { ISearchLocation } from "@interfaces/ISearchLocation";
import { RootStackParamList } from "@customTypes/RootStackParamList";

type SearchWeatherRouteProp = RouteProp<RootStackParamList, "SearchWeather">;

type SearchWeatherNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchWeather"
>;

interface ISearchWeatherProps {
  route: SearchWeatherRouteProp;
  navigation: SearchWeatherNavigationProp;
}

const SearchWeather: FC<ISearchWeatherProps> = ({ route, navigation }) => {
  const [city, setCity] = useState("");
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const { name } = location;

    navigation.navigate("CurrentWeather", { cityName: name });
  };

  const handleChangeCity = (city: string) => {
    setCity(city);
  };

  return (
    <SafeAreaView>
      <View className="relative h-screen bg-green-100">
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
      </View>
    </SafeAreaView>
  );
};

export default SearchWeather;
