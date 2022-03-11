import { IEvent } from "./interfaces/IEvent";
import isEqual = require("lodash/isEqual");

const months = {
  january: ["jan", "jan.", "január", "1", "01"],
  february: ["feb", "febr", "február", "2", "02"],
  march: ["mar", "marc", "már", "márc", "március", "3", "03"],
  april: ["apr", "ápr", "április", "4", "04"],
  may: ["may", "maj", "máj", "május", "5", "05"],
  june: ["jun", "june", "jún", "júni", "június", "6", "06"],
  july: ["jul", "july", "júl", "júli", "július", "7", "07"],
  august: ["aug", "augusztus", "august", "8", "08"],
  september: [
    "sep",
    "sept",
    "szep",
    "szept",
    "september",
    "szeptember",
    "9",
    "09",
  ],
  october: ["oct", "okt", "október", "october", "10", "10"],
  november: ["nov", "november", "11"],
  december: ["dec", "december", "12"],
};

export const getMonthNumber = (monthAsString: string): number => {
  const trimmedMonth = monthAsString
    .trim()
    .replace(".", "")
    .toLocaleLowerCase();

  switch (true) {
    case months.january.includes(trimmedMonth):
      return 1;
    case months.february.includes(trimmedMonth):
      return 2;
    case months.march.includes(trimmedMonth):
      return 3;
    case months.april.includes(trimmedMonth):
      return 4;
    case months.may.includes(trimmedMonth):
      return 5;
    case months.june.includes(trimmedMonth):
      return 6;
    case months.july.includes(trimmedMonth):
      return 7;
    case months.august.includes(trimmedMonth):
      return 8;
    case months.september.includes(trimmedMonth):
      return 9;
    case months.october.includes(trimmedMonth):
      return 10;
    case months.november.includes(trimmedMonth):
      return 11;
    case months.december.includes(trimmedMonth):
      return 12;
    default:
      return 0;
  }
};

export const sortByDate = (events: IEvent[]) => {
  return Object.entries(events)
    .sort(([, a], [, b]) => {
      return (
        new Date(`${a.year}-${a.month}-${a.day}`).getTime() -
        new Date(`${b.year}-${b.month}-${b.day}`).getTime()
      );
    })
    .map((e) => e[1]);
};

export const isDuplicate = (arr, newItem) => {
  const itContains = arr.find((element) => {
    return isEqual(element, newItem);
  });

  return Boolean(itContains);
};
