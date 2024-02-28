import React, { FC, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

import LoaderComponent from "@components/LoaderComponent";
import { TemperatureUnit, useWeatherContext } from "@context/WeatherContext";
import { ISearchLocation } from "@interfaces/ISearchLocation";
import { RootStackParamList } from "@customTypes/RootStackParamList";

interface ISavedLocations {
  savedLocations: ISearchLocation[] | null;
  keyboardHide: () => void;
  handleDeleteCityFromStorage: (name: string, region: string) => Promise<void>;
}

const SavedSearchLocations: FC<ISavedLocations> = ({
  savedLocations,
  keyboardHide,
  handleDeleteCityFromStorage,
}) => {
  const [isEdit, setEdit] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { weatherSettings } = useWeatherContext();

  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth } = windowDimensions;

  return (
    <>
      {savedLocations ? (
        <View className="relative flex-1 flex items-center">
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
                keyboardHide();
                setEdit((prev) => !prev);
              }}
            >
              <Entypo name="edit" size={16} color={isEdit ? "red" : "black"} />
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
    </>
  );
};

export default SavedSearchLocations;
