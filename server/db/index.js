const mongoose = require("mongoose");

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

const Person = mongoose.model("FlightData", {
  flightName: String,
  flightDate: String,
  origin: String,
  destination: String,
  scheduledTime: String,
  departureTime: String,
  currentStatus: String,
});

var myFunc = async function saveData() {
  const person = new Person({
    flightName: "FLIGHT123",
    flightDate: "sdfsda",
    origin: "sdfgsdg",
    destination: "asdfsadf",
    scheduledTime: "sdfsdf",
    departureTime: "sdfsdsdf",
    currentStatus: "arrived",
  });
  await person.save();
  await person.save();
};

module.exports = { connectDb, myFunc: myFunc };
