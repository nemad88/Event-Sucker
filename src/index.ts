import express = require("express");
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();

import budapestPark from "./budapestPark";
import akvariumklub from "./akvariumKlub";

try {
  router.get("/akvariumklub", akvariumklub);
  router.get("/budapestpark", budapestPark);

  app.use("/api/v1", router);
} catch (error) {
  console.log("==========================");
  console.log(error);
  console.log("==========================");
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
