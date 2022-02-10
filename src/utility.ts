const january = ["jan", "jan.", "január", "1", "01"];
const february = ["feb", "febr", "február", "2", "02"];
const march = ["mar", "marc", "már", "márc", "március", "3", "03"];
const april = ["apr", "ápr", "április", "4", "04"];
const may = ["may", "maj", "máj", "május", "5", "05"];
const june = ["jun", "june", "jún", "júni", "június", "6", "06"];
const july = ["jul", "july", "júl", "júli", "7", "07"];
const august = ["aug", "augusztus", "august", "8", "08"];
const september = [
  "sep",
  "sept",
  "szep",
  "szept",
  "september",
  "szeptember",
  "9",
  "09",
];
const october = ["oct", "okt", "október", "october", "10", "10"];
const november = ["nov", "november", "11"];
const december = ["dec", "december", "12"];

export const getMonthNumber = (monthAsString: string): number => {
  const trimmedMonth = monthAsString
    .trim()
    .replace(".", "")
    .toLocaleLowerCase();

  switch (true) {
    case january.includes(trimmedMonth):
      return 1;
    case february.includes(trimmedMonth):
      return 2;
    case march.includes(trimmedMonth):
      return 3;
    case april.includes(trimmedMonth):
      return 4;
    case may.includes(trimmedMonth):
      return 5;
    case june.includes(trimmedMonth):
      return 6;
    case july.includes(trimmedMonth):
      return 7;
    case august.includes(trimmedMonth):
      return 8;
    case september.includes(trimmedMonth):
      return 9;
    case october.includes(trimmedMonth):
      return 10;
    case november.includes(trimmedMonth):
      return 11;
    case december.includes(trimmedMonth):
      return 12;
    default:
      return 0;
  }
};
