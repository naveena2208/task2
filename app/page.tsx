"use client";

import { socket } from "./socket";
import { useEffect } from "react";
import FlightTable from "./components/flighttable/FlightTable";
import Navbar from "./components/Navbar";

export default function Home() {
  useEffect(() => {
    if (socket.connected) console.log("connected");
  }, []);
  return (
    <div>
      <Navbar />
      <FlightTable />
    </div>
  );
}
