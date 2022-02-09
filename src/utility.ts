export const getMonthNumber = (monthAsString: string): number => {
  switch (true) {
    case monthAsString.toLocaleLowerCase() === "január":
      return 1;
    case monthAsString.toLocaleLowerCase() === "február" ||
      monthAsString.toLocaleLowerCase() === "febr.":
      return 2;
    default:
      return 0;
  }
};
