import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ISearchLocation } from "@interfaces/ISearchLocation";

interface ICitiesList {
  searchLocations: ISearchLocation[];
  handleClickLocation: (location: ISearchLocation) => void;
}

const CitiesList: FC<ICitiesList> = ({
  searchLocations,
  handleClickLocation,
}) => {
  return (
    <View className="absolute top-10 z-10 w-full bg-gray-300 rounded-3xl">
      {searchLocations.map((loc, index) => {
        const showBorder = index + 1 != searchLocations.length;
        const borderClass = showBorder ? " border-b-2 border-b-gray-400" : "";
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleClickLocation(loc)}
            // className={
            //   "flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass
            // }
          >
            <View
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
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CitiesList;
