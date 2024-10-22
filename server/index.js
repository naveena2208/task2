const io = require("./socket/client.js");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.listen(8002, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log("Server started at PORT 8002");
  }
});

app.use(bodyParser.json());

// mongodb
const mongoDBURL = "mongodb://127.0.0.1:27017/airport";
const connectDb = async () => {
  try {
    await mongoose.connect(mongoDBURL, {});
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
};

connectDb();

const FlightData = mongoose.model("FlightData", {
  flightName: String,
  flightDate: String,
  origin: String,
  destination: String,
  scheduledTime: String,
  departureTime: String,
  currentStatus: String,
});

const places = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
];

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "-" + mm + "-" + yyyy;
};

const generateRandom = (max) => {
  return Math.floor(Math.random() * max + 1);
};

var myFunc = async function saveData() {
  const flightIds = [
    "AIR1234",
    "VIS654",
    "IND45678",
    "SRILAN2345",
    "VIS874",
    "AIR983",
  ];
  flightIds.map(async (flight) => {
    let data = new FlightData({
      flightName: flight,
      flightDate: getTodayDate(),
      origin: places[generateRandom(places.length - 1)],
      destination: places[generateRandom(places.length - 1)],
      scheduledTime: "10:00:00",
      departureTime: "12:00:00",
      currentStatus: "ARRIVED",
    });
    await data.save();
  });
};

app.post("/flights", async (req, res) => {
  await myFunc();
  res.send("Data saved successfully");
});

app.get("/flights", async (req, res) => {
  FlightData.find({}).then(function (users) {
    res.send(users);
  });
});

app.put("/flights", async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  console.log(req.body.id);

  FlightData.findById(id)
    .then((model) => {
      return Object.assign(model, { currentStatus: status });
    })
    .then((model) => {
      return model.save();
    })
    .then((updatedModel) => {
      res.json({
        msg: "model updated",
        updatedModel,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});
