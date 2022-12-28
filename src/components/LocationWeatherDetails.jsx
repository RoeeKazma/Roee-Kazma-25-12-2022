import React from "react";
import { useSelector } from "react-redux";
import { dateConverter } from "../utils/dateConverter";
import { iconTransition } from "../utils/iconTranslator";
import { tempConvertor } from "../utils/tempConvertor";

export const LocationWeatherDetails = ({ location }) => {
  const theme = useSelector((state) => state.darkModeSlice.mode);
  const degree = useSelector((state) => state.degreeSlice.mode);

  return (
    <div className="flex ">
      <div
        className={` grid text-center justify-center  ${
          theme === "light"
            ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-xl"
            : "bg-gradient-to-b from-gray-600 to-gray-800 shadow-xl"
        } rounded-md w-52 h-54 md:w-64 md:h-64 `}>
        <span
          className={` text-2xl pt-4 pb-2 ${
            theme === "light" ? "" : " text-white"
          }`}>
          {dateConverter(location.Date)}
        </span>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${iconTransition(
            location?.Day.Icon ?? 1
          )}-s.png`}
          alt="Weather-Image"
          className=" md:w-36 md:h-28 w-28 h-16  mx-auto"
        />
        <span
          className={`text-2xl pb-3 ${theme === "light" ? "" : " text-white"}`}>
          {tempConvertor(location?.Temperature.Minimum.Value, degree)}°-
          {tempConvertor(location?.Temperature.Maximum.Value, degree)}°
        </span>
      </div>
    </div>
  );
};
