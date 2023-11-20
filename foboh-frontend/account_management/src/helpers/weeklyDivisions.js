function getWeekDivisions() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const weekDivisions = [];
  let currentWeek = [];

  for (
    let day = firstDayOfMonth;
    day <= lastDayOfMonth;
    day.setDate(day.getDate() + 1)
  ) {
    const dayOfWeek = day.getDay();

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      // Start a new week when Sunday is encountered
      weekDivisions.push([...currentWeek]);
      currentWeek = [];
    }

    currentWeek.push(day.getDate());

    if (dayOfWeek === 6 && day < lastDayOfMonth) {
      // End the current week on Saturday (unless it's the last day of the month)
      weekDivisions.push([...currentWeek]);
      currentWeek = [];
    }
  }

  // If there are remaining days in the last week
  if (currentWeek.length > 0) {
    weekDivisions.push([...currentWeek]);
  }

  return weekDivisions;
}

export const getWeeks = () => {
  const weekList = getWeekDivisions();

  const updatedWeeks = weekList.map((item) => {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString("default", { month: "short" });

    return `${monthName} ${item[0]}`;
  });

  return updatedWeeks;
};
