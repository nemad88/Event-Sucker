import { load } from "cheerio";
import axios from "axios";
import { getMonthNumber, sortByDate, isDuplicate } from "./utility";

const getWebData = async (url) => {
  return axios.get(url).then(({ data }) => data);
};

export default async (_, res) => {
  const URL = "https://www.budapestpark.hu/";
  const data = await getWebData(URL);
  const $ = load(data);
  const elemSelector = ".splide__slide__main";

  const eventsAsArray = [];

  $(elemSelector).each((_, elem) => {
    const titleSelector = ".title";
    const dateSelector = ".date";

    const title = decodeURI($(elem).find(titleSelector).text());
    const date = decodeURI($(elem).find(dateSelector).text())
      .replace("&nbsp;", "")
      .split(".")
      .map((el) => el.trim().split(" "));
    const dateYear = date[0][0];
    const dateMonth = getMonthNumber(date[1][0]);
    const dateDay = date[1][1];

    const imageUrl = $(elem).find("img").attr("src");

    if (title && date) {
      const newEvent = {
        title,
        day: parseInt(dateDay),
        month: dateMonth,
        year: parseInt(dateYear),
        place: "Budapest Park",
        imageUrl: imageUrl,
      };

      if (!isDuplicate(eventsAsArray, newEvent)) {
        eventsAsArray.push(newEvent);
      }
    }
  });

  res.status(200);

  res.send(sortByDate(eventsAsArray));
};
