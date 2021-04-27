const express = require("express");
const path = require("path");
const cors = require("cors");

const { hamsters, matches } = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "public/files")));
app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use(cors()).use(express.json()).use("/api", hamsters).use("/api", matches);

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
