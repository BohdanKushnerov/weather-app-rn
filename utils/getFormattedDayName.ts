export const getFormattedDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  const dayName = date.toLocaleDateString("en-US", options).split(",")[0];
  return dayName;
};
