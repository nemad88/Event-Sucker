import cheerio from "cheerio";
import axios from "axios";
import { getMonthNumber } from "./utility";

const getWebData = async (url) => {
  return axios.get(url).then(({ data }) => data);
};

export default async (req, res) => {
  const URL = "https://akvariumklub.hu/programok";
  const data = await getWebData(URL);
  const $ = cheerio.load(data);

  const selector = ".programs-cards__wrapper a";
  const akvariumEvents = [];

  $(selector).each((_index, elem) => {
    const title = $(elem).find("h5").text().trim();
    const imageUrl = $(elem).find("img").attr("src");
    const dateMonth = $(elem).find(".date__month");
    const dateDay = $(elem).find(".date__day");
    const day = parseInt(
      dateDay.text().trim().replace("\n", "").replace(".", "")
    );
    // const month = dateMonth.text().replaceAll(".", "");

    const lengthOfDateMonth = dateMonth.length;
    const lengthDateDay = dateDay.length;

    if (lengthOfDateMonth > 1 || lengthDateDay > 1) {
      console.log("DUPLA");
      const monthList = [];
      const dayList = [];

      dateMonth.each((i, elem) => {
        monthList.push($(elem).text().trim());
      });

      dateDay.each((i, elem) => {
        dayList.push($(elem).text().trim());
      });

      if (monthList.length === dayList.length) {
        for (let i = 0; i < monthList.length; i++) {
          akvariumEvents.push({
            title,
            day: parseInt(dayList[i]),
            month: getMonthNumber(monthList[i]),
            place: "Akvárium Klub",
          });
        }
      }
      return;
    }

    const month = getMonthNumber(dateMonth.text().trim());
    let year = new Date().getFullYear();
    if (dateMonth.text().trim().split(" ").length > 1) {
      year = parseInt(dateMonth.text().trim().split(" ")[0]);
    }

    akvariumEvents.push({
      title,
      day,
      month,
      year,
      place: "Akvárium Klub",
      imageUrl,
    });
  });

  res.send(akvariumEvents);
};
