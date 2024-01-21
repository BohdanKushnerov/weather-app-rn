import React from 'react'
import { ActivityIndicator, View } from 'react-native';

const LoaderComponent = () => {
  return (
    <View className="h-full flex justify-center items-center">
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

export default LoaderComponent