import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ISearchLocation } from "@interfaces/ISearchLocation";

interface ICitiesListProps {
  searchLocations: ISearchLocation[];
  handleClickLocation: (location: ISearchLocation) => void;
}

const CitiesList: FC<ICitiesListProps> = ({
  searchLocations,
  handleClickLocation,
}) => {
  return (
    <View className="absolute top-14 z-10 w-full bg-gray-300 rounded-3xl border shadow shadow-black">
      {searchLocations.map((loc, index) => {
        const showBorder = index + 1 != searchLocations.length;
        const borderClass = showBorder ? " border-b-2 border-b-gray-400" : "";
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleClickLocation(loc)}
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
              <Text className=" ml-2 font-[SoraSemiBold] text-black text-lg">
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
