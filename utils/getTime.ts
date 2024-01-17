export const getTime = (date: Date) => {
  const lastUpdatedDate = new Date(date);
  return lastUpdatedDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};
