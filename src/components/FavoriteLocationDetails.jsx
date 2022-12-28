import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { iconTransition } from "../utils/iconTranslator";
import { tempConvertor } from "../utils/tempConvertor";
import { useNavigate } from "react-router-dom";
import { setLocationKey, setLocationName } from "../store/slices/weatherSlice";

const FavoriteLocationDetails = ({
  locationName,
  Day: { Icon },
  Temperature: { Minimum, Maximum },
  locationKey,
}) => {
  const theme = useSelector((state) => state.darkModeSlice.mode);
  const degree = useSelector((state) => state.degreeSlice.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(setLocationKey(locationKey));
    dispatch(setLocationName(locationName));
    navigate("/");
  };

  return (
    <div
      className="flex text-center justify-center mb-20"
      onClick={onClickHandler}>
      <div
        className={`flex flex-col text-center justify-around items-center relative ${
          theme === "light"
            ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-xl"
            : "bg-gradient-to-b from-gray-600 to-gray-800 shadow-xl"
        } rounded-md w-60 h-60 md:w-96 md:h-80 `}>
        <span
          className={` md:text-3xl text-xl mt-4 ${
            theme === "light" ? "" : "text-white"
          }`}>
          {locationName}
        </span>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${iconTransition(
            Icon
          )}-s.png`}
          alt="Weather-Image"
          className=" md:h-40 h-32"
        />
        <span
          className={`text-3xl font-mono ${
            theme === "light" ? "" : "text-white"
          }`}>
          {tempConvertor(Minimum.Value, degree)}
          °-
          {tempConvertor(Maximum.Value, degree)}°
        </span>
      </div>
    </div>
  );
};

export default FavoriteLocationDetails;
