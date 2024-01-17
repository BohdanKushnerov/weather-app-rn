import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import AdditionalInfo from "./AdditionalInfo";
import { formatDate } from "../../utils/formatDate";
import { getTime } from "../../utils/getTime";
import { getFormattedDayName } from "../../utils/getFormattedDayName";
import {
  fetchLocations,
  fetchWeatherCurrent,
  fetchWeatherForecast,
} from "../../api/weather";
import { IAirQuality } from "../../interfaces/IAirQuality";
import AirQuality from "./AirQuality";

interface ILocationWeather {
  name: string;
  region: string;
  country: string;
  localtime: Date;
}

interface IConditionWeather {
  text: string;
  icon: string;
  code: number;
}

interface ICurrentWeather {
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

interface IDailyWeather {
  location: ILocationWeather;
  current: ICurrentWeather;
}

interface ISearchLocation {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

interface IForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: IConditionWeather;
  };
}

interface IForecastData {
  forecastday: IForecastDay[];
}

interface IForecastWeather {
  location: ILocationWeather;
  current: ICurrentWeather;
  forecast: IForecastData;
}

type WeatherData = IDailyWeather | IForecastWeather;

function isForecastWeatherData(data: WeatherData): data is IForecastWeather {
  return (data as IForecastWeather).forecast !== undefined;
}

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchLocations, setSearchLocations] = useState<
    ISearchLocation[] | null
  >(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

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
    if (location) {
      const { latitude, longitude } = location.coords;
      fetchWeatherCurrent({ latitude, longitude }).then((data) => {
        setWeather(data);
      });
    }
  }, [location]);

  // console.log(weather);

  const handleSearchLocations = debounce((search: string) => {
    if (search && search.length > 2)
      fetchLocations({ cityName: search, days: 7 }).then((data) => {
        setSearchLocations(data);
      });
  }, 1200);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleClickLocation = (location: ISearchLocation) => {
    // console.log("location", location);
    const { name } = location;

    fetchWeatherForecast({ cityName: name, days: 7 }).then((data) => {
      setWeather(data);
      handleToggleSearch();
    });
  };

  // console.log("weather", weather);

  return (
    <SafeAreaView className="py-[30px] bg-gray-800">
      <View
        className="relative h-10 flex-row justify-end items-center rounded-full bg-blue-500"
        style={
          {
            // backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
          }
        }
      >
        {showSearch ? (
          <TextInput
            autoFocus={true}
            onChangeText={handleSearchLocations}
            placeholder="Search city"
            placeholderTextColor={"lightgray"}
            className="pl-6 h-10 pb-1 flex-1 text-base text-white bg-slate-400 rounded-md"
          />
        ) : null}

        <TouchableOpacity
          onPress={handleToggleSearch}
          className="absolute rounded-full p-3 m-1"
          // style={{ backgroundColor: theme.bgWhite(0.3) }}
        >
          {showSearch ? (
            <Fontisto name="close" size={24} color="black" />
          ) : (
            <Fontisto name="search" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      {searchLocations && searchLocations.length > 0 && showSearch ? (
        <View className="absolute top-20 z-10 w-full bg-gray-300 rounded-3xl">
          {searchLocations.map((loc, index) => {
            let showBorder = index + 1 != searchLocations.length;
            let borderClass = showBorder ? " border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleClickLocation(loc)}
                className={
                  "flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass
                }
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="gray"
                />
                <Text className="text-black text-lg ml-2">
                  {loc?.name}, {loc?.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}

      {weather ? (
        <>
          <View className="flex items-center px-[16px] py-[16px] bg-rosyBrown rounded-3xl">
            <Text className="font-[SoraBold] text-peachPuff text-base font-medium ">
              {`${weather.location.name}, ${weather.location.region}, ${weather.location.country}`}
            </Text>

            <Text className="font-[SoraMedium] text-peachPuff text-xs">
              {formatDate(weather.location.localtime)}
            </Text>

            <Text className="font-[SoraRegular] text-peachPuff text-base font-medium">
              Current weather
            </Text>

            <Text className="text-peachPuff text-xs font-medium">
              Last update: {getTime(weather.current.last_updated)}
            </Text>

            <View className="flex flex-row items-center gap-x-[10px]">
              <Image
                className="w-[64px] h-[64px]"
                source={{ uri: `https:${weather.current.condition.icon}` }}
              />
              <View className="flex flex-row">
                <Text className="pt-[12px] font-[SoraBold] text-peachPuff text-6xl">
                  {weather.current.temp_c}
                </Text>
                <Text className="text-peachPuff text-6xl">°</Text>
              </View>
            </View>

            <Text className="mb-[5px] text-peachPuff text-sm">
              <Text className="font-[SoraSemiBold]">Condition: </Text>
              {weather.current.condition.text}
            </Text>

            <Text className="mb-[20px] font-[SoraMedium] text-peachPuff text-xs">
              <Text className="font-[SoraSemiBold]">Feels like: </Text>
              {weather.current.feelslike_c}°
            </Text>

            <AdditionalInfo currentWeather={weather.current} />
          </View>
          {/*  */}
          <AirQuality airQuality={weather.current.air_quality} />
        </>
      ) : (
        <View>
          <Text>Давай ищи погоду для начала, потому что не пришла</Text>
        </View>
      )}

      {/* forecast for next days */}
      {weather && isForecastWeatherData(weather) && weather.forecast && (
        <View className="mb-2 space-y-3 z-30">
          <View className="flex-row items-center mx-5 space-x-2">
            <Fontisto name="calendar" size={24} color="black" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>

          <View className="w-full mb-16 h-48">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
              {weather?.forecast?.forecastday?.map(
                (item: IForecastDay, index: number) => {
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    >
                      <Image
                        // source={{uri: 'https:'+item?.day?.condition?.icon}}
                        source={{ uri: `https:${item?.day?.condition?.icon}` }}
                        className="w-11 h-11"
                      />
                      <Text className="text-white">
                        {getFormattedDayName(item.date)}
                      </Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                }
              )}
            </ScrollView>
          </View>
        </View>
      )}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default CurrentWeather;

{
  /* <FlatList
  data={weather?.forecast?.forecastday}
  renderItem={({ item }) => {
    const date = new Date(item.date);
    const options = { weekday: "long" };
    let dayName = date.toLocaleDateString("en-US", options);
    dayName = dayName.split(",")[0];

    return (
      <>
        <View
          // key={index}  // 'key' should not be used inside FlatList
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          // style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          <Image
            // source={{uri: 'https:'+item?.day?.condition?.icon}}
            source={{ uri: `https:${item?.day?.condition?.icon}` }}
            className="w-11 h-11"
          />
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white text-xl font-semibold">
            {item?.day?.avgtemp_c}&#176;
          </Text>
        </View>
        <View
          // key={index}  // 'key' should not be used inside FlatList
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          // style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          <Image
            // source={{uri: 'https:'+item?.day?.condition?.icon}}
            source={{ uri: `https:${item?.day?.condition?.icon}` }}
            className="w-11 h-11"
          />
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white text-xl font-semibold">
            {item?.day?.avgtemp_c}&#176;
          </Text>
        </View>
      </>
    );
  }}
  keyExtractor={(item) => item.date}
/>; */
}
