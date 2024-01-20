import { FC } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

interface ICityInput {
  isLoading: boolean;
  showSearch: boolean;
  handleSearchLocations: (search: string) => void;
  handleToggleSearch: () => void;
}

const CityInput: FC<ICityInput> = ({
  isLoading,
  showSearch,
  handleSearchLocations,
  handleToggleSearch,
}) => {
  return (
    <View className="h-10 flex-row justify-end items-center rounded-full">
      {showSearch ? (
        <TextInput
          autoFocus={true}
          onChangeText={handleSearchLocations}
          placeholder="Search city"
          placeholderTextColor={"white"}
          className="w-full pl-6 h-10 pb-1 flex-1 text-base bg-inherit rounded-full bg-gray-600 font-[SoraBold] placeholder:text-2xl text-white"
        />
      ) : null}

      <>
        {isLoading && (
          <>
            <ActivityIndicator
              className="absolute rounded-full p-12"
              size="large"
              color="#00ff00"
            />
          </>
        )}
      </>

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
