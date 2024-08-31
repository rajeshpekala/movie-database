import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("themeMode")
    ? JSON.parse(localStorage.getItem("themeMode") || "false")
    : false,
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("themeMode", JSON.stringify(state.mode));
    },
   
  },
});

export const { toggleMode} = themeSlice.actions;

export default themeSlice.reducer;
