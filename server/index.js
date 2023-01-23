const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("./routes/index");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
