const getDateValue = (date: Date | string): Date =>
  date instanceof Date ? date : new Date(date);

export const getNextEmiDate = (date: Date | string = new Date()): Date => {
  const sourceDate = getDateValue(date);
  const year = sourceDate.getFullYear();
  const month = sourceDate.getMonth();
  const day = sourceDate.getDate();
  const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();

  return new Date(year, month + 1, Math.min(day, lastDayOfNextMonth));
};

export const getEmiSchedule = (
  startDate: Date | string,
  tenureMonths: number
): Date[] => {
  const sourceDate = getDateValue(startDate);
  const anchorDay = sourceDate.getDate();

  return Array.from({ length: tenureMonths }, (_, index) => {
    const monthOffset = index + 1;
    const targetYear = sourceDate.getFullYear();
    const targetMonth = sourceDate.getMonth() + monthOffset;
    const lastDayOfTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

    return new Date(
      targetYear,
      targetMonth,
      Math.min(anchorDay, lastDayOfTargetMonth)
    );
  });
};

export const formatEmiDate = (date: Date | string): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(getDateValue(date));