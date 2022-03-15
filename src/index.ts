import express = require("express");
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();

import budapestPark from "./budapestPark";
import akvariumklub from "./akvariumKlub";

router.get("/akvariumklub", akvariumklub);
router.get("/budapestpark", budapestPark);

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
