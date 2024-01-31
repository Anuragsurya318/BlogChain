import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice({
  name: "blog",
  initialState: null,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    setBlogsNull: (state, action) => {
      return null;
    },
  },
});

export const { setBlogs, setBlogsNull } = BlogSlice.actions;
export default BlogSlice.reducer;
