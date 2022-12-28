import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useEffect } from "react";
import {
  getLocationKey,
  getLocationWeather,
} from "../store/slices/weatherSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/slices/favoriteLocationsSlice";
import { iconTransition } from "../utils/iconTranslator";
import { LocationWeatherDetails } from "./LocationWeatherDetails";
import { tempConvertor } from "../utils/tempConvertor";
let initalLoad = true;
export const DisplayedLocation = () => {
  const theme = useSelector((state) => state.darkModeSlice.mode);
  const degree = useSelector((state) => state.degreeSlice.mode);
  const favoriteLocations = useSelector(
    (state) => state.favoriteLocationsSlice.favoriteLocations
  );
  const {
    locationKey,
    locationData,
    locationName,
    status,
    cords,
    locationByCordsStatus,
  } = useSelector((state) => state.weatherSlice);

  const dispatch = useDispatch();

  const isFavorite = favoriteLocations?.filter(
    (f) => f.locationKey === locationKey
  );

  const favoriteToggleHandler = () => {
    if (isFavorite.length > 0) {
      dispatch(removeFromFavorites(locationKey));
    } else {
      dispatch(
        addToFavorites({
          ...locationData[0],
          locationName,
          locationKey,
        })
      );
    }
  };

  useEffect(() => {
    if (initalLoad) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          getLocationKey(
            position.coords.latitude + "," + position.coords.longitude
          )
        );
        dispatch(getLocationWeather(locationKey));
      });
      initalLoad = false;
    }
  }, [cords, dispatch]);

  useEffect(() => {
    dispatch(getLocationWeather(locationKey));
  }, [locationKey, dispatch]);

  const isLoading = status === "loading" || locationByCordsStatus === "loading";

  return (
    <>
      <div className="flex text-center justify-center mb-20">
        <div
          className={`grid text-center justify-center ${
            theme === "light"
              ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-xl"
              : "bg-gradient-to-b from-gray-600 to-gray-800 shadow-xl"
          } rounded-md w-60 h-60 md:w-96 md:h-80 `}>
          {isFavorite.length > 0 ? (
            <BsStarFill
              className={` text-2xl absolute m-4 ${
                theme === "light" ? "" : " text-white"
              }`}
              onClick={favoriteToggleHandler}
            />
          ) : (
            <BsStar
              className={` text-2xl absolute m-4 ${
                theme === "light" ? "" : " text-white"
              }`}
              onClick={favoriteToggleHandler}
            />
          )}
          <span
            className={` text-4xl  mt-4 font- ${
              theme === "light" ? "" : "text-white"
            }`}>
            {locationName}
          </span>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${iconTransition(
              locationData[0]?.Day.Icon ?? 1
            )}-s.png`}
            alt="Weather-Image"
            className="md:w-40 md:h-40 w-32 h-32"
          />
          {isLoading ? (
            <div className=" text-4xl">Loading</div>
          ) : (
            <span
              className={`text-4xl  ${theme === "light" ? "" : "text-white"}`}>
              {tempConvertor(
                locationData[0]?.Temperature.Minimum.Value,
                degree
              )}
              °-
              {tempConvertor(
                locationData[0]?.Temperature.Maximum.Value,
                degree
              )}
              °
            </span>
          )}
        </div>
      </div>
      <div className=" flex flex-wrap md:flex justify-center  gap-5 md:gap-24 ">
        {locationData.length
          ? (locationData ?? []).map((location) => (
              <LocationWeatherDetails location={location} key={location.Date} />
            ))
          : null}
      </div>
    </>
  );
};
