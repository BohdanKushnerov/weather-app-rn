const formatDate = (time: Date) => {
  const originalDate = new Date(time);

  const day = originalDate.getDate();
  const monthIndex = originalDate.getMonth();
  const year = originalDate.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export default formatDate;
