import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "F",
};

export const degreeSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleDegree: (state) => {
      if (state.mode === "F") {
        state.mode = "C";
      } else {
        state.mode = "F";
      }
    },
  },
});

export const { toggleDegree } = degreeSlice.actions;
export default degreeSlice.reducer;
