import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./slices/darkModeSlice";
import degreeSlice from "./slices/degreeSlice";
import favoriteLocationsSlice from "./slices/favoriteLocationsSlice";
import weatherSlice from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    darkModeSlice: darkModeSlice,
    weatherSlice: weatherSlice,
    degreeSlice: degreeSlice,
    favoriteLocationsSlice: favoriteLocationsSlice,
  },
});
