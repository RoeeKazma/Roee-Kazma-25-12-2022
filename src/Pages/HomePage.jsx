import React from "react";
import { useSelector } from "react-redux";
import { DisplayedLocation } from "../components/DisplayedLocation";
import { Searchbar } from "../components/Searchbar";

export const HomePage = () => {
  const theme = useSelector((state) => state.darkModeSlice.mode);
  return (
    <>
      <div
        className=" bg-cover min-h-screen pb-20"
        style={{
          backgroundImage:
            theme === "light"
              ? `url("https://wallpaperaccess.com/full/846628.jpg")`
              : `url("https://wallpaperaccess.com/full/203545.jpg")`,
        }}>
        <Searchbar />
        <DisplayedLocation />
      </div>
    </>
  );
};
