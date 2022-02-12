import fs = require("fs");
import path = require("path");
import cheerio from "cheerio";

const myHtml = fs.readFileSync(`${__dirname}/demo.html`);

const $ = cheerio.load(myHtml);

export default () => {
  //   console.log("Hello");
  //   console.log(myHtml.toString("utf-8"));
  $("ul").each((i, element) => {
    console.log(`${i}. ${$(element).text()}`);
  });
};
