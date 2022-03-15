import { load } from "cheerio";
import axios from "axios";
import { getMonthNumber, sortByDate, isDuplicate } from "./utility";
import { IEvent } from "./interfaces/IEvent";

const getWebData = async (url: string) => {
  return axios.get(url).then(({ data }) => data);
};

export default async (_, res) => {
  const URL = "https://akvariumklub.hu/programok";
  const data = await getWebData(URL);
  const $ = load(data);

  const selector = ".programs-cards__wrapper a";
  const akvariumEvents: IEvent[] = [];

  $(selector).each((_index, elem) => {
    const title = $(elem).find("h5").text().trim();

    const removeImageResize = (urlImg) => {
      const newUrlImgAsArray = urlImg.split("-300x");
      newUrlImgAsArray[1] = newUrlImgAsArray[1].substring(3);
      return newUrlImgAsArray.join("");
    };

    const imageUrl = removeImageResize($(elem).find("img").attr("src"));

    const dateMonth = $(elem).find(".date__month");
    const dateDay = $(elem).find(".date__day");
    const day = parseInt(
      dateDay.text().trim().replace("\n", "").replace(".", "")
    );

    const lengthOfDateMonth = dateMonth.length;
    const lengthDateDay = dateDay.length;

    if (lengthOfDateMonth > 1 || lengthDateDay > 1) {
      console.log("DUPLA");
      const monthList = [];
      const dayList = [];

      dateMonth.each((_, elem) => {
        monthList.push($(elem).text().trim());
      });

      dateDay.each((_, elem) => {
        dayList.push($(elem).text().trim());
      });

      if (monthList.length === dayList.length) {
        for (let i = 0; i < monthList.length; i++) {
          akvariumEvents.push({
            title,
            day: parseInt(dayList[i]),
            month: getMonthNumber(monthList[i]),
            place: "Akvárium Klub",
            imageUrl,
            year: new Date().getFullYear(),
          });
        }
      }
      return;
    }

    let month = getMonthNumber(dateMonth.text().trim());

    let year = new Date().getFullYear();
    if (dateMonth.text().trim().split(" ").length > 1) {
      year = parseInt(dateMonth.text().trim().split(" ")[0]);
      month = getMonthNumber(dateMonth.text().trim().split(" ")[1]);
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

  res.header("Access-Control-Allow-Origin", "*");
  res.send(sortByDate(akvariumEvents));
};
