import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch: (state, action) => {
      return action.payload;
    },
    setProjectsNull: (state, action) => {
      return null;
    },
  },
});

export const { setSearch, setProjectsNull } = searchSlice.actions;
export default searchSlice.reducer;
