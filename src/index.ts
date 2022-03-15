import express = require("express");
const app = express();
const port = process.env.PORT || 3004;
const router = express.Router();

import budapestPark from "./budapestPark";
import akvariumklub from "./akvariumKlub";

router.get("/akvariumklub", akvariumklub);
router.get("/budapestpark", budapestPark);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
