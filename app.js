const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { hamsters, matches } = require("./routes");

const app = express();
const port = 3000;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/api", hamsters)
  .use("/api", matches)
  .use(cors());

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});