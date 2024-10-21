"use client";

import { socket } from "@/app/socket";
import React, { useState, useEffect } from "react";

const page = () => {
  const [FlightData, setFlightData] = useState([]);
  const [DataReceived, SetDataReceived] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8002/flights");
    const data = await response.json();
    console.log(data);
    setFlightData(data);
    SetDataReceived(true);
  };

  const getDataForUI = (key: string, value: string) => {
    let data: string = "";
    FlightData.forEach((flight: any) => {
      if (flight[value] == name) {
        data = flight[key];
      }
    });
    return data;
  };

  const emitData = () => {
    console.log("called");
    console.log(getDataForUI("_id", "flightName"));
    socket.emit("message", "update ui");
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setName(value);
  };

  return (
    <div>
      <h1>Change Status</h1>
      <input className="border m-4" onChange={handleChange} type="text" />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={emitData}
      >
        Change Status
      </button>
    </div>
  );
};

export default page;
