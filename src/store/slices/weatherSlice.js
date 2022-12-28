import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLocationKey = createAsyncThunk(
  "state/locationKey",
  async (cords) => {
    return await axios
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${cords}&q=details=true`
      )
      .then((res) => res.data);
  }
);

export const getLocationWeather = createAsyncThunk(
  "state/locationWeather",
  async (locationKey) => {
    return await axios
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => res.data.DailyForecasts);
  }
);

const initialState = {
  locationKey: "215854",
  locationName: "Tel Aviv",
  locationData: "",
  status: "",
  locationByCordsStatus: "",
  cords: null,
};

export const weatherSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setLocationKey: (state, action) => {
      state.locationKey = action.payload;
    },
    setLocationName: (state, action) => {
      state.locationName = action.payload;
    },
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setCords: (state, action) => {
      state.cords = action.payload;
    },
  },
  extraReducers: {
    [getLocationKey.pending]: (state) => {
      state.locationByCordsStatus = "loading";
    },
    [getLocationKey.fulfilled]: (state, action) => {
      state.locationKey = action.payload.Key;
      state.locationName = action.payload.LocalizedName;
      state.locationByCordsStatus = "success";
    },
    [getLocationKey.rejected]: (state, action) => {
      state.locationByCordsStatus = "failed";
    },
    [getLocationWeather.pending]: (state) => {
      state.status = "loading";
    },
    [getLocationWeather.fulfilled]: (state, action) => {
      state.locationData = action.payload;
      state.status = "success";
    },
    [getLocationWeather.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { setLocationKey, setLocationName, setLocationData, setCords } =
  weatherSlice.actions;
export default weatherSlice.reducer;
