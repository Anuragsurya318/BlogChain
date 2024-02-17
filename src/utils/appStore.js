import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    // reducers
    user: userReducer,
    blog: blogReducer,
    search: searchReducer,
    theme: themeReducer,
  },
});

export default appStore;
