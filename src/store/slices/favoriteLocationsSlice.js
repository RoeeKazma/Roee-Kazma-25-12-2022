import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteLocations: [],
};

export const favoriteLocationsSlice = createSlice({
  name: "favoriteLocationSlice",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favoriteLocations.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favoriteLocations = state.favoriteLocations.filter((location) => {
        return location.locationKey !== action.payload;
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } =
  favoriteLocationsSlice.actions;
export default favoriteLocationsSlice.reducer;
