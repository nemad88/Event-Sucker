import express = require("express");
import cors = require("cors");
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();

import budapestPark from "./budapestPark";
import akvariumklub from "./akvariumKlub";

// app.use(cors());

router.get("/akvariumklub", cors(), akvariumklub);
router.get("/budapestpark", cors(), budapestPark);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
