import { FC } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { IAirQuality } from "../../interfaces/IAirQuality";

const TextInfo = styled(Text);
const InfoView = styled(View);

interface IAdditionalInfo {
  currentWeather: {
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

const AdditionalInfo: FC<IAdditionalInfo> = ({ currentWeather }) => {
  return (
    <InfoView className="flex flex-row flex-wrap gap-2 justify-center">
      <TextInfo className="text-peachPuff text-xs font-medium leading-normal">
        Wind: {currentWeather.wind_kph} k/h {currentWeather.wind_dir}
        <Entypo name="direction" size={16} color={"black"} />
      </TextInfo>
      <TextInfo className="text-peachPuff text-xs font-medium leading-normal">
        Humidity: {currentWeather.humidity} %
      </TextInfo>
      <TextInfo className="text-peachPuff text-xs font-medium leading-normal">
        UV Index: {currentWeather.uv}
      </TextInfo>
      <TextInfo className="text-peachPuff text-xs font-medium leading-normal">
        Pressure: {currentWeather.pressure_mb} Mbar{" "}
      </TextInfo>
      <TextInfo className="text-peachPuff text-xs font-medium leading-normal">
        Visibility: {currentWeather.vis_km} km{" "}
      </TextInfo>
    </InfoView>
  );
};

export default AdditionalInfo;
