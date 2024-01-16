import { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import axios from "axios";
import * as Location from "expo-location";

import { apiKey, baseUrl, endpoints } from "../../constants/constants";
import formatDate from "../../utils/formatDate";
import AirQualityComponent from "./AirQualityComponent";
import { IAirQuality } from "../../interfaces/IAirQuality";
import getTime from "../../utils/getTime";
import AdditionalInfo from "./AdditionalInfo";

const DailyView = styled(View);
const TextInfo = styled(Text);
const ImageTempView = styled(View);
const ImageWeather = styled(Image);
const TempView = styled(View);

interface IDailyWeather {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: Date;
  };
  current: {
    last_updated: Date;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    air_quality: IAirQuality;
  };
}

const CurrentWeather: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [weather, setWeather] = useState<IDailyWeather | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  useEffect(() => {
    // if (location) {
    //   const { latitude, longitude } = location.coords;
      // const finalUrl = `${baseUrl}/${endpoints.current}?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
      const finalUrl = `${baseUrl}/${endpoints.current}?key=${apiKey}&q=Kyiv&aqi=yes`;

      axios.get(finalUrl).then((response) => {
        setWeather(response.data);
      });
    // }
  }, []);

  return (
    <>
      {weather && (
        <>
          <DailyView className="flex items-center px-[16px] py-[16px] w-[280px] h-[300px] bg-rosyBrown rounded-3xl">
            <TextInfo className="font-[SoraBold] text-orange-300 text-base font-medium ">
              {/* California, Los Angeles */}
              {`${weather.location.name}, ${weather.location.region}, ${weather.location.country}`}
            </TextInfo>

            <TextInfo className="font-[SoraMedium] text-orange-300 text-xs">
              {/* 21 Oct 2019 */}
              {formatDate(weather.location.localtime)}
            </TextInfo>

            <TextInfo className="font-[SoraRegular] text-orange-300 text-base font-medium">
              Current weather
            </TextInfo>

            <TextInfo className="text-orange-300 text-xs font-medium">
              {/* 21 Oct 2019 */}
              Last update: {getTime(weather.current.last_updated)}
            </TextInfo>

            <ImageTempView className="flex flex-row items-center gap-x-[10px]">
              <ImageWeather
                className="w-[64px] h-[64px]"
                source={{ uri: `https:${weather.current.condition.icon}` }}
              />
              <TempView className="flex flex-row">
                <TextInfo className="pt-[12px] font-[SoraBold] text-orange-300 text-6xl">
                  {weather.current.temp_c}
                </TextInfo>
                <TextInfo className="text-orange-300 text-6xl">°</TextInfo>
              </TempView>
            </ImageTempView>

            <TextInfo className="mb-[5px] text-orange-300 text-sm">
              <TextInfo className="font-[SoraSemiBold]">Condition: </TextInfo>
              {weather.current.condition.text}
            </TextInfo>

            <TextInfo className="mb-[20px] font-[SoraMedium] text-orange-300 text-xs">
              <TextInfo className="font-[SoraSemiBold]">Feels like: </TextInfo>
              {weather.current.feelslike_c}°
            </TextInfo>
            {/*  */}
            <AdditionalInfo currentWeather={weather.current} />
          </DailyView>
          {/*  */}
          <AirQualityComponent airQuality={weather.current.air_quality} />
        </>
      )}
    </>
  );
};

export default CurrentWeather;
