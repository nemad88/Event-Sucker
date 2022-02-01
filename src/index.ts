import express = require("express");
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const port = 3004;

const { load: cheerioLoad } = cheerio;

const getWebData = async (url) => {
  return axios.get(url).then(({ data }) => data);
};

app.get("/akvariumklub", async (req, res) => {
  const URL = "https://akvariumklub.hu/programok";
  const data = await getWebData(URL);
  const $ = cheerioLoad(data);

  const selector = ".programs-cards__wrapper a";

  const akvariumEvents = [];

  $(selector).each((index, elem) => {
    const title = cheerioLoad(elem)("h5").text().trim();
    const dateMonth = cheerioLoad(elem)(".date__month");
    const dateDay = cheerioLoad(elem)(".date__day");
    const lengthOfDate = dateMonth.length;

    if (lengthOfDate > 1) {
      const monthList = [];
      const dayList = [];
      let dateString = "";

      cheerioLoad(elem)(".date__month").each((i, elem) => {
        monthList.push(cheerioLoad(elem).text().trim());
      });

      cheerioLoad(elem)(".date__day").each((i, elem) => {
        dayList.push(cheerioLoad(elem).text().trim());
      });

      if (monthList.length === dayList.length) {
        for (let i = 0; i < monthList.length; i++) {
          if (i > 0) {
            dateString += ` - ${monthList[i]} ${dayList[i]}`;
            continue;
          }

          dateString += `${monthList[i]} ${dayList[i]}`;
        }
      }

      akvariumEvents.push({ title, date: dateString, place: "Akvárium Klub" });

      return;
    }

    akvariumEvents.push({
      title,
      date: `${dateMonth.text().trim()} ${dateDay.text().trim()}`,
      place: "Akvárium Klub",
    });

    // console.log("length", cheerioLoad(elem)(".date__month").length);

    // cheerioLoad(elem)(".date__month").each((i, elem) => {
    //   console.log(cheerioLoad(elem).text().trim());
    // });

    // cheerioLoad(elem)(".date__day").each((i, elem) => {
    //   console.log(cheerioLoad(elem).text().trim());
    // });

    // cheerioLoad(elem)(".date__day-name").each((i, elem) => {
    //   console.log(cheerioLoad(elem).text().trim());
    // });
  });

  res.send(akvariumEvents);
});

app.get("/budapestpark", async (req, res) => {
  const URL = "https://www.budapestpark.hu/";
  const data = await getWebData(URL);
  const $ = cheerioLoad(data, {
    xml: {
      normalizeWhitespace: true,
    },
  });
  const elemSelector = ".box-info";

  let html = "";
  const eventsAsArray = [];

  $(elemSelector).each((index, elem) => {
    const titleSelector = ".title";
    const dateSelector = ".date";

    const title = decodeURI(cheerio.load(elem)(titleSelector).text());
    const date = decodeURI(cheerio.load(elem)(dateSelector).text()).replace(
      "&nbsp;",
      ""
    );

    if (title && date)
      eventsAsArray.push({ title, date, place: "Budapest Park" });
    html += `<div><h1>${title}</h1> <h3>${date}</h3></div>`;
  });

  console.log(html);

  res.status(200);
  // res.header("Content-Type", "text/html");
  // res.send(html);
  res.send(eventsAsArray);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
