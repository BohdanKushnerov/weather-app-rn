const fn2 = (weather: string) => {
  switch (weather) {
    case "Blowing snow":
      return "Snow";
    case "Blizzard":
      return "Blizzard";
    case "Clear":
      return "Clear";
    case "Cloudy":
      return "Cloudy";
    case "Fog":
      return "Fog";

    case "Freezing drizzle":
      return "Drizzle";
    case "Freezing fog":
      return "Fog";
    case "Heavy freezing drizzle":
      return "Drizzle";
    case "Heavy rain":
      return "Heavy_rain";
    case "Heavy rain at times":
      return "Heavy_rain";

    case "Heavy snow":
      return "Snow";
    case "Ice pellets":
      return "Pellets";
    case "Light drizzle":
      return "Drizzle";
    case "Light freezing rain":
      return "Freezing rain";
    case "Light rain":
      return "Rain";

    case "Light rain shower":
      return "Rain";
    case "Light showers of ice pellets":
      return "Pellets";
    case "Light sleet":
      return "Sleet";
    case "Light sleet showers":
      return "Sleet";
    case "Light snow":
      return "Snow";

    case "Light snow showers":
      return "Snow";
    case "Mist":
      return "Mist";
    case "Moderate or heavy freezing rain":
      return "Freezing rain";
    case "Moderate or heavy rain":
      return "Rain";
    case "Moderate or heavy rain shower":
      return "Rain";

    case "Moderate or heavy rain in area with thunder":
      return "Rain_thunder";
    case "Moderate or heavy sleet":
      return "Sleet";
    case "Moderate or heavy sleet showers":
      return "Sleet";
    case "Moderate or heavy snow":
      return "Snow";
    case "Moderate or heavy snow showers":
      return "Snow";

    case "Moderate or heavy snow in area with thunder":
      return "Snow";
    case "Moderate or heavy showers of ice pellets":
      return "Pellets";
    case "Moderate rain":
      return "Rain";
    case "Moderate rain at times":
      return "Rain";
    case "Moderate rain shower":
      return "Rain";

    case "Moderate showers of ice pellets":
      return "Pellets";
    case "Overcast":
      return "Overcast";
    case "Partly cloudy":
      return "Cloudy";
    case "Patchy freezing drizzle nearby":
      return "Drizzle";
    case "Patchy heavy snow":
      return "Snow";

    case "Patchy light drizzle":
      return "Drizzle";
    case "Patchy light rain":
      return "Rain";
    case "Patchy light rain in area with thunder":
      return "Rain_thunder";
    case "Patchy light snow":
      return "Snow";
    case "Patchy light snow in area with thunder":
      return "Snow";

    case "Patchy moderate snow":
      return "Snow";
    case "Patchy rain nearby":
      return "Rain";
    case "Patchy sleet nearby":
      return "Sleet";
    case "Patchy snow nearby":
      return "Snow";
    case "Thundery outbreaks in nearby":
      return "Thundery";

    case "Torrential rain shower":
      return "Rain";
    case "Patchy freezing rain nearby":
      return "Freezing_rain";
    case "Patchy sleet nearby":
      return "Sleet";
    case "Sunny":
      return "Sunny";

    default:
      return "Default";
  }
};
