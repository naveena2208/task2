import React, { useState } from "react";
import Error from "./Error";

const Dropdown = (props: any) => {
  const [currentStatus, setCurrentStatus] = useState("ARRIVED");
  const [selectedFlight, setSelectedFlight] = useState(props.flightNames[0]);
  const [ErrorMsg, setErrorMsg] = useState(false);

  const flightStatus = [
    "ARRIVED",
    "CHECK IN",
    "BOARDING",
    "FINAL CALL",
    "DEPARTURED",
    "DELAYED",
  ];

  const trackStatus = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  const trackFlight = (e: any) => {
    setSelectedFlight(e.target.value);
  };

  return (
    <div>
      {ErrorMsg && <Error />}
      <div className="max-w-sm mx-auto m-4">
        <label className="block mt-4 mb-1 text-lg font-medium text-gray-900 dark:text-white">
          Flight
        </label>
        <select
          onChange={trackFlight}
          defaultValue={props.flightNames[0]}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {props.flightNames.map((data: any, index: any) => {
            return <option key={index}>{data}</option>;
          })}
        </select>
        <label className="block mt-4 mb-1 text-lg font-medium text-gray-900 dark:text-white">
          Status
        </label>
        <select
          onChange={trackStatus}
          defaultValue={flightStatus[0]}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {flightStatus.map((data, index) => {
            return <option key={index}>{data}</option>;
          })}
        </select>
        <button
          onClick={() => {
            if (props.flightNames.length != 0) {
              props.handleButton({
                flightName: selectedFlight,
                status: currentStatus,
              });
            } else {
              setErrorMsg(true);
            }
          }}
          className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Change Status
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
