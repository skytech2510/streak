export function getDayInfo(date: Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = date.getDay();
  const dayName = days[dayIndex];

  return {
    index: dayIndex,
    name: dayName,
    shortName: dayName.slice(0, 3)
  };
} 