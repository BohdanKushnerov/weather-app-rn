export const getAirQualityInfo = (airQuality: number) => {
  let bgColor, status;

  switch (airQuality) {
    case 1:
      bgColor = "rgb(34 197 94)"; // Green
      status = "Good";
      break;
    case 2:
      bgColor = "rgb(250 204 21)"; // Green-Yellow
      status = "Moderate";
      break;
    case 3:
      bgColor = "rgb(253 224 71)"; // Yellow
      status = "Unhealthy for Sensitive Groups";
      break;
    case 4:
      bgColor = "rgb(249 115 22)"; // Orange
      status = "Unhealthy";
      break;
    case 5:
      bgColor = "rgb(239 68 68)"; // Red-Orange
      status = "Very Unhealthy";
      break;
    case 6:
      bgColor = "rgb(153 27 27)"; // Red
      status = "Hazardous";
      break;
    default:
      bgColor = "rgb(107 114 128)"; // Gray for unknown
      status = "Unknown";
  }

  return { bgColor, status };
};
