const { Flight } = require("./Flight");

const flights = [
  "Air India",
  "Vistara",
  "Indigo",
  "SriLankan AirLines",
  "Emirates",
  "Etihad",
];
const locations = [
  "Delhi",
  "Chennai",
  "Pune",
  "London",
  "Swizerland",
  "Bangalore",
];

module.exports = function createFlights(count) {
  let flights = [];
  for (let i = 0; i <= count; i++) {
    flights.push(createFlightObj());
  }
  return flights;
};

const createFlightObj = () => {
  return {
    FlightId: "123456",
    FlightName: "Air India",
    FlightDate: "2024-09-01",
    Origin: "sdfsaf",
    Destination: "sadfasdf",
    ScheduledTime: "10:00:00",
    DepartureTime: "13:00:00",
  };
  //   let flightNum = createRandom(0, 5);
  //   let source = createRandom(0, 5);
  //   let destination = createRandom(0, 5);
  //   let time = createRandom(1, 23);
  //   if (source == destination && source == 5) destination = 1;
  //   else if (source == destination && source < 5) destination = source + 1;
  //   return new Flight(
  //     flights[flightNum],
  //     "2024-10-21",
  //     locations[source],
  //     locations[destination],
  //     time,
  //     (time + Math.random() * (23 - time)) | 0
  //   );
};

const createRandom = (min, max) => {
  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
};
