export const getAirQualityInfo = (airQuality: number) => {
  let bgColor, status;

  switch (airQuality) {
    case 1:
      bgColor = "bg-green-500"; // Green
      status = "Good";
      break;
    case 2:
      bgColor = "bg-yellow-500"; // Yellow-Green
      status = "Moderate";
      break;
    case 3:
      bgColor = "bg-yellow-300"; // Yellow
      status = "Unhealthy for Sensitive Groups";
      break;
    case 4:
      bgColor = "bg-orange-500"; // Orange
      status = "Unhealthy";
      break;
    case 5:
      bgColor = "bg-red-500"; // Red-Orange
      status = "Very Unhealthy";
      break;
    case 6:
      bgColor = "bg-red-800"; // Red
      status = "Hazardous";
      break;
    default:
      bgColor = "bg-gray-500"; // Gray for unknown
      status = "Unknown";
  }

  return { bgColor, status };
};
