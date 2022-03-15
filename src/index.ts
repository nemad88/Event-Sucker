import express = require("express");
import cors = require("cors");
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();

import budapestPark from "./budapestPark";
import akvariumklub from "./akvariumKlub";

router.get(
  "/akvariumklub",
  cors({ credentials: true, origin: "*" }),
  akvariumklub
);
router.get(
  "/budapestpark",
  cors({ credentials: true, origin: "*" }),
  budapestPark
);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
