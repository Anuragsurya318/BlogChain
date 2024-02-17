import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

export const themeSLice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setLight: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setDark, setLight } = themeSLice.actions;

export default themeSLice.reducer;
