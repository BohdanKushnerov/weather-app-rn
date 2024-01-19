import axios from "axios";
import { apiKey, baseUrl, endpoints } from "../constants/constants";

const currentEndpoint = (params: {
  latitude: number;
  longitude: number;
  days: number;
}) =>
  // `${baseUrl}/${endpoints.current}?key=${apiKey}&q=${params.latitude},${params.longitude}&aqi=yes`;
  `${baseUrl}/${endpoints.forecast}?key=${apiKey}&q=${params.latitude},${params.longitude}&days=${params.days}&aqi=yes&alerts=no`;

const forecastEndpoint = (params: { cityName: string; days: number }) =>
  `${baseUrl}/${endpoints.forecast}?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=no`;

const locationsEndpoint = (params: { cityName: string; days: number }) =>
  `${baseUrl}/${endpoints.searchAutocomplete}?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchWeatherCurrent = (params: {
  latitude: number;
  longitude: number;
  days: number;
}) => {
  let forecastUrl = currentEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchWeatherForecast = (params: {
  cityName: string;
  days: number;
}) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (params: { cityName: string; days: number }) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
};
