import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const darkModeSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      if (state.mode === "light") {
        state.mode = "dark";
      } else {
        state.mode = "light";
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
