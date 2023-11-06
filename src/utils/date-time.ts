import { format, parse } from "date-fns";

const dateFormat = "yyyy-MM-dd";
const referenceDate = new Date(1970, 0, 1, 0, 0, 0);

// Format Date
export const formatDate = (date: Date) => {
  try {
    return format(date, dateFormat);
  } catch (err) {
    return;
  }
};
//

// Parse Date
export const parseDate = (value: string) => {
  try {
    return parse(value, dateFormat, referenceDate);
  } catch (err) {
    return;
  }
};
//

// Add Days To Date
export const addDaysToDate = (date: Date, count: number) => {
  date.setDate(date.getDate() + count);
  return date;
};
//

//
//

/**
 * Get Year From Formatted Date String
 *
 * `MM/yyyy` -> `yyyy`
 **/
export const getYearFromFormattedDateString = (date: string) => {
  try {
    return date.split("/").pop();
  } catch (err) {
    return;
  }
};
//
