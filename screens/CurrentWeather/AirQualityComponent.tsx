import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { IAirQualityProps } from "../../interfaces/IAirQualityProps";

const AirQualityComponent: FC<IAirQualityProps> = ({ airQuality }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Air Quality:</Text>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>Carbon Monoxide (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.co} ppm</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>Ozone (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.o3} ppm</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>Nitrogen dioxide (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.no2} ppm</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>Sulphur dioxide (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.so2} ppm</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>PM2.5 (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.pm2_5} µg/m³</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>PM10 (μg/m3):</Text>
        <Text style={styles.itemValue}>{airQuality.pm10} µg/m³</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>US EPA Index:</Text>
        <Text style={styles.itemValue}>{airQuality["us-epa-index"]}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>UK Defra Index:</Text>
        <Text style={styles.itemValue}>{airQuality["gb-defra-index"]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  airQualityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  itemLabel: {
    marginRight: 4,
  },
  itemValue: {
    fontWeight: "bold",
  },
});

export default AirQualityComponent;
