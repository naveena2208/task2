"use client";

import { socket } from "@/app/socket";
import { get } from "http";
import React, { useEffect, useState } from "react";

const FlightTable = () => {
  const [FlightData, setFlightData] = useState([]);
  const [DataReceived, SetDataReceived] = useState(false);

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
    const response = await fetch("http://localhost:8002/flights");
    const data = await response.json();
    console.log(data);
    setFlightData(data);
    SetDataReceived(true);
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
      {DataReceived && (
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    FlightName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    FlightDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Origin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Destination
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ScheduledTime
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DepartureTime
                  </th>
                  <th scope="col" className="px-6 py-3">
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
                        return (
                          <td key={index} className="px-6 py-4">
                            {data1}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightTable;
