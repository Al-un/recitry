export const parseDate = (dateTime: string | null): Date | null => {
  if (dateTime === null) return null;

  try {
    return new Date(dateTime);
  } catch {
    return null;
  }
};
