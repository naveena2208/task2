"use client";

import { socket } from "./socket";
import { useEffect } from "react";
import FlightTable from "./components/flighttable/FlightTable";

export default function Home() {
  useEffect(() => {
    if (socket.connected) console.log("connected");
  }, []);
  return (
    <div>
      <h1>Flight Data Management</h1>
      <FlightTable />
    </div>
  );
}
