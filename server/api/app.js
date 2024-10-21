const express = require("express");
const cors = require("cors");
const myFunc = require("./../db/index.js");

const app = express();

app.use(cors());

app.listen(8002, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log("Server started at PORT 8002");
  }
});

app.get("/hello", async (req, res) => {
  await myFunc();
  res.send("hello world");
});

app.get("/test", (req, res) => {
  let data = createFlight(2);
  res.send(data);
});

module.exports = { app };
