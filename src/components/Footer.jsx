import React from "react";
import { useSelector } from "react-redux";

export const Footer = () => {
  const theme = useSelector((state) => state.darkModeSlice.mode);
  return (
    <div
      className={` pl-2 ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-2xl"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 shadow-2xl"
      }`}>
      Made by Roee Kazma
    </div>
  );
};
