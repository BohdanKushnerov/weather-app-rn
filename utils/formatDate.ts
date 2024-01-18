export const formatDate = (time: Date) => {
  const originalDate = new Date(time);

  const day = originalDate.getDate();
  const monthIndex = originalDate.getMonth();
  const year = originalDate.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day} ${monthNames[monthIndex]} ${year}`;
};
