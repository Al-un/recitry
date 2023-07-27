export const parseDate = (
  dateTime: string | null,
  throwError: boolean = false
): Date | null => {
  if (dateTime === null) return null;

  // new Date(string) uses Date.parse under the hood and if NaN is returned,
  // then the input is assumed to be invalid
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#syntax
  if (isNaN(Date.parse(dateTime))) {
    if (throwError) {
      throw new Error(`Input ${dateTime} is not a valid date`);
    } else {
      return null;
    }
  }

  return new Date(dateTime);
};
