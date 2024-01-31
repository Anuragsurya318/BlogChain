import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
  reducer: {
    // reducers
    user: userReducer,
    blog: blogReducer,
    search: searchReducer,
  },
});

export default appStore;
