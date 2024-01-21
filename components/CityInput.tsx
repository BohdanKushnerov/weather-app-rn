import { FC } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { debounce } from "lodash";

interface ICityInput {
  isLoading: boolean;
  city: string;
  handleChangeCity: (search: string) => void;
}

const CityInput: FC<ICityInput> = ({ isLoading, city, handleChangeCity }) => {
  return (
    <View className="h-10 flex-row justify-end items-center rounded-full">
      <TextInput
        autoFocus={true}
        value={city}
        onChangeText={handleChangeCity}
        placeholder="Search city"
        placeholderTextColor={"white"}
        className="w-full pl-6 h-10 pb-1 flex-1 text-base bg-inherit rounded-full bg-gray-600 font-[SoraBold] placeholder:text-2xl text-white"
      />

      {isLoading && (
        <ActivityIndicator
          className="absolute rounded-full p-12"
          size="large"
          color="#00ff00"
        />
      )}

      <TouchableOpacity className="absolute rounded-full p-3 m-1">
        <Fontisto name="close" size={24} color="white" />
        {/* <Fontisto name="search" size={24} color="white" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default CityInput;
