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
    <View className="absolute top-6 right-0 w-full z-10 h-12 flex-row justify-end items-center rounded-full">
      {showSearch ? (
        <TextInput
          autoFocus={true}
          onChangeText={handleSearchLocations}
          placeholder="Search city"
          placeholderTextColor={"white"}
          className="pl-6 h-12 pb-1 flex-1 text-base bg-inherit rounded-full bg-pink-300 font-[SoraBold] placeholder:text-2xl text-light"
        />
      ) : null}

      <TouchableOpacity
        onPress={handleToggleSearch}
        className="absolute rounded-full p-3 m-1"
      >
        {showSearch ? (
          <Fontisto name="close" size={24} color="white" />
        ) : (
          <Fontisto name="search" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CityInput;
