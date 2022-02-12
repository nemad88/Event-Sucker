import express = require("express");
import cheerio from "cheerio";
import axios from "axios";
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();
import demo from "./demo";
import { getMonthNumber } from "./utility";

const { load: cheerioLoad } = cheerio;

demo();

const getWebData = async (url) => {
  return axios.get(url).then(({ data }) => data);
};

router.get("/akvariumklub", async (req, res) => {
  const URL = "https://akvariumklub.hu/programok";
  const data = await getWebData(URL);
  const $ = cheerioLoad(data);

  const selector = ".programs-cards__wrapper a";

  const akvariumEvents = [];

  $(selector).each((_index, elem) => {
    const title = cheerioLoad(elem)("h5").text().trim();
    const imageUrl = cheerioLoad(elem)("img").attr("src");
    const dateMonth = cheerioLoad(elem)(".date__month");
    const dateDay = cheerioLoad(elem)(".date__day");
    const lengthOfDateMonth = dateMonth.length;
    const lengthDateDay = dateDay.length;

    if (lengthOfDateMonth > 1 || lengthDateDay > 1) {
      const monthList = [];
      const dayList = [];

      cheerioLoad(elem)(".date__month").each((i, elem) => {
        monthList.push(cheerioLoad(elem).text().trim());
      });

      cheerioLoad(elem)(".date__day").each((i, elem) => {
        dayList.push(cheerioLoad(elem).text().trim());
      });

      if (monthList.length === dayList.length) {
        for (let i = 0; i < monthList.length; i++) {
          akvariumEvents.push({
            title,
            day: dayList[i],
            month: monthList[i],
            place: "Akvárium Klub",
          });
        }
      }
      return;
    }

    akvariumEvents.push({
      title,
      date: `${getMonthNumber(dateMonth.text().trim())} ${dateDay
        .text()
        .trim()}`,
      place: "Akvárium Klub",
      imageUrl,
    });
  });

  res.send(akvariumEvents);
});

router.get("/budapestpark", async (req, res) => {
  const URL = "https://www.budapestpark.hu/";
  const data = await getWebData(URL);
  const $ = cheerioLoad(data, {
    xml: {
      normalizeWhitespace: true,
    },
  });
  const elemSelector = ".splide__slide__main";

  const eventsAsArray = [];

  $(elemSelector).each((index, elem) => {
    const titleSelector = ".title";
    const dateSelector = ".date";

    const title = decodeURI(cheerioLoad(elem)(titleSelector).text());
    const date = decodeURI(cheerioLoad(elem)(dateSelector).text()).replace(
      "&nbsp;",
      ""
    );
    const imageUrl = cheerioLoad(elem)("img").attr("src");

    if (title && date)
      eventsAsArray.push({
        title,
        date,
        place: "Budapest Park",
        imageUrl: imageUrl,
      });
  });

  res.status(200);

  res.send(eventsAsArray);
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
