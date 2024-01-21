import { FC, useState } from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { debounce } from "lodash";
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

const SearchWeather: FC<ISearchWeatherProps> = ({
  route: { params },
  navigation,
}) => {
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSelectWeather, resetWeather, scrollToTop } = params;

  console.log("==========", handleSelectWeather, resetWeather, scrollToTop);

  // console.log("SearchWeather params", params);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickLocation = (location: ISearchLocation) => {
    const { name } = location;

    params.handleSelectWeather("Today");
    params.resetWeather();
    params.scrollToTop();

    navigation.navigate("CurrentWeather", { cityName: name });

    // setIsLoading(true);

    // fetchWeatherForecast({ cityName: name, days: 1 }).then((data) => {
    // setWeather(data);
    // setCurrentSearchLocation(name);
    // setSelectedWeather("Today");
    // setTomorrowWeather(null);
    // setTenDays(null);
    // setIsLoading(false);
    // handleToggleSearch();
    // scrollToTop();
    // });
  };

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

  return (
    <View>
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
  );
};

export default SearchWeather;
