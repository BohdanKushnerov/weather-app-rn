import { Fontisto } from "@expo/vector-icons";
import React, { FC } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface ICityInput {
  showSearch: boolean;
  handleSearchLocations: (search: string) => void;
  handleToggleSearch: () => void;
}

const CityInput: FC<ICityInput> = ({
  showSearch,
  handleSearchLocations,
  handleToggleSearch,
}) => {
  return (
    <View className="relative h-10 flex-row justify-end items-center rounded-full">
      {showSearch ? (
        <TextInput
          autoFocus={true}
          onChangeText={handleSearchLocations}
          placeholder="Search city"
          placeholderTextColor={"lightgray"}
          className="pl-6 h-10 pb-1 flex-1 text-base text-white bg-slate-400 rounded-full"
        />
      ) : null}

      <TouchableOpacity
        onPress={handleToggleSearch}
        className="absolute rounded-full p-3 m-1"
      >
        {showSearch ? (
          <Fontisto name="close" size={24} color="black" />
        ) : (
          <Fontisto name="search" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CityInput;
