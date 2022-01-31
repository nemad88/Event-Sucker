import express = require("express");
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const port = 3004;

const getWebData = async () => {
  return axios.get("https://www.budapestpark.hu/").then(({ data }) => data);
};

app.get("/", async (req, res) => {
  const data = await getWebData();
  const $ = cheerio.load(data);
  console.log($);
  res.status(200);
  //   res.header("Content-Type", "text/html");
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
