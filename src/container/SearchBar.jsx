import { setSearch } from "@/utils/searchSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const searchTerm = useSelector((state) => (state.search ? state.search : ""));
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="h-12 border-b-2 w-full bg-gray-50 border-b-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-sm focus:border-transparent p-2 shadow-md dark:bg-little-dark-bg dark:shadow-dark-shadow dark:border-none"
      />
    </div>
  );
};

export default SearchBar;
