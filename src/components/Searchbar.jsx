import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UseDebounce } from "../utils/useDebounce";
import { setLocationKey, setLocationName } from "../store/slices/weatherSlice";

export const Searchbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationData, setLocationData] = useState("");
  const debounceValue = UseDebounce(searchQuery, 500);

  const onClickHandler = (cityKey, cityName) => {
    dispatch(setLocationKey(cityKey));
    dispatch(setLocationName(cityName));
    setSearchQuery("");
    setLocationData(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${debounceValue}`
      );
      setLocationData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData();
    }
    setLocationData(null);
  }, [debounceValue]);

  return (
    <div className=" grid justify-center py-14">
      <div className=" flex border border-purple-200 rounded relative">
        <input
          type="text"
          value={searchQuery}
          className=" px-4 py-2 font-medium border bg-white  rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 w-80"
          placeholder="Search a location"
          lang="en"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className=" -mt-14  bg-white z-10 absolute top-24">
          {searchQuery && locationData && (
            <div>
              {locationData.length ? (
                locationData.map((location) => {
                  return (
                    <div
                      className=" cursor-pointer pl-2 pb-1 border-b-2 border-l-2 border-r-2 w-80 "
                      key={location.Key}
                      onClick={() =>
                        onClickHandler(location.Key, location.LocalizedName)
                      }>
                      {location.LocalizedName}
                    </div>
                  );
                })
              ) : (
                <div className=" -mt-1 p-2 text-center border-solid border-2 rounded-sm  border-indigo-500 font-bold bg-white text-lg ">
                  No location found with the name <i>{debounceValue}</i>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
