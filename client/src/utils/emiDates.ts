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

export const formatEmiDate = (date: Date | string): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(getDateValue(date));