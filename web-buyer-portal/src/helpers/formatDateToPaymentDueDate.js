export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);

  return `Payment due by ${day}${ordinalSuffix} ${month} ${year}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
