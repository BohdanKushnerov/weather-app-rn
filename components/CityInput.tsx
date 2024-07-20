import React, { FC } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Fontisto } from "@expo/vector-icons";

interface ICityInputProps {
  isLoading: boolean;
  city: string;
  handleChangeCity: (search: string, resetLocations?: boolean) => void;
}

const CityInput: FC<ICityInputProps> = ({
  isLoading,
  city,
  handleChangeCity,
}) => {
  const resetSearch = () => {
    handleChangeCity("", true);
  };

  return (
    <View className="h-14 flex-row justify-end items-center">
      <TextInput
        autoFocus={true}
        value={city}
        onChangeText={handleChangeCity}
        placeholder="Search city"
        placeholderTextColor="white"
        className="w-full pl-6 h-14 pb-1 flex-1 text-base rounded-xl border bg-slate-500 font-[SoraBold] placeholder:text-xl text-white"
      />

      {isLoading && (
        <ActivityIndicator
          className="absolute rounded-full p-12"
          size="large"
          color="#00ff00"
        />
      )}

      {city && (
        <TouchableOpacity
          className="absolute rounded-full p-3 m-1"
          onPress={resetSearch}
        >
          <Fontisto name="close" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CityInput;
