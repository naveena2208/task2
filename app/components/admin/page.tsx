"use client";

import { socket } from "@/app/socket";
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Success from "./Success";
import Error from "./Error";

const page = () => {
  const [FlightData, setFlightData] = useState([]);
  const [DataReceived, SetDataReceived] = useState(false);
  const [updated, SetUpdated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8002/flights");
      const data = await response.json();
      setFlightData(data);
      SetDataReceived(true);
    } catch (ex) {
      setFlightData([]);
      SetDataReceived(false);
    }
  };

  const getDataForUI = (key: string, value: string) => {
    let data: string = "";
    FlightData.forEach((flight: any) => {
      if (flight["flightName"] == value) {
        data = flight["_id"];
      }
    });
    return data;
  };

  const startTimer = () => {
    setTimeout(function () {
      SetUpdated(false);
    }, 1000);
  };

  const handleClick = async (data: any) => {
    let newData = {};
    Object.assign(
      newData,
      { status: data.status },
      { id: getDataForUI("_id", data.flightName) }
    );
    console.log(newData);
    try {
      const response = await fetch("http://localhost:8002/flights", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      let responseData = await response.json();
      console.log(responseData);
      SetUpdated(true);
      startTimer();
      socket.emit("message", "update ui");
    } catch (ex) {
      setError(true);
      console.log("Server not connected");
    }
  };

  const getFlightNames = () => {
    const flightNames: Array<String> = [];
    FlightData.map((flights) => {
      flightNames.push(flights["flightName"]);
    });
    return flightNames;
  };

  return (
    <div>
      {updated && <Success />}
      {error && <Error />}
      <Dropdown handleButton={handleClick} flightNames={getFlightNames()} />
    </div>
  );
};

export default page;
