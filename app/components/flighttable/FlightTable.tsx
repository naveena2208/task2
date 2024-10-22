"use client";

import { socket } from "@/app/socket";
import { get } from "http";
import React, { useEffect, useState } from "react";

const FlightTable = () => {
  const [FlightData, setFlightData] = useState([]);
  const [DataReceived, SetDataReceived] = useState(false);
  const [message, setMessage] = useState("Loading data");

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("refresh done");
      getData();
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8002/flights");
      const data = await response.json();
      console.log(data);
      setFlightData(data);
      SetDataReceived(true);
    } catch (ex) {
      setMessage("Failed to Load Data");
      setFlightData([]);
      SetDataReceived(false);
    }
  };

  const getDataForUI = (key: string) => {
    let ids: Array<String> = [];
    FlightData.forEach((flight: any) => {
      ids.push(flight[key]);
    });
    return ids;
  };

  const dataValue = (key: String) => {
    let data: Array<String> = [];
    FlightData.forEach((flight: any) => {
      if (flight["flightName"] == key) {
        Object.values(flight).forEach((sadfasd, index) => {
          if (index > 1 && index != 8) {
            data.push(String(sadfasd));
          }
        });
      }
    });
    return data;
  };

  return (
    <div>
      {DataReceived ? (
        FlightData.length == 0 ? (
          <h1 className="text-center text-2xl font-bold">No Flights Today</h1>
        ) : (
          <div className="m-8">
            <div className="rounded-md relative overflow-x-auto">
              <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Flight Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Flight Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Origin
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Destination
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Scheduled Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Departure Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataForUI("flightName").map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data}
                        </th>
                        {dataValue(data).map((data1, index) => {
                          if (index == 5) {
                            return (
                              <td
                                key={index}
                                style={{
                                  color:
                                    data1 == "BOARDING"
                                      ? "green"
                                      : data1 == "ARRIVED"
                                      ? "orange"
                                      : data1 == "FINAL CALL"
                                      ? "yellow"
                                      : data1 == "CHECK IN"
                                      ? "pink"
                                      : data1 == "DEPARTURED"
                                      ? "purple"
                                      : data1 == "DELAYED"
                                      ? "red"
                                      : "black",
                                }}
                                className="animate-pulse font-bold px-6 py-4"
                              >
                                {data1}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                key={index}
                                className=" font-semibold px-6 py-4"
                              >
                                {data1}
                              </td>
                            );
                          }
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <h1 className="text-center text-2xl font-bold">{message}</h1>
      )}
    </div>
  );
};

export default FlightTable;
