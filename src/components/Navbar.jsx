import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { SearchBar } from "../container/index";
import logo from "../assets/logo.png";
import darklogo from "../assets/dark-logo.png";
import { MdHome, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "./index";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setDark, setLight } from "@/utils/themeSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleCreateBlogClick = () => {
    if (!user) {
      alert("Please log in first");
    }
  };

  return (
    <div className="flex h-[120px] dark:bg-dark-bg shadow-md justify-between dark:shadow-dark-shadow items-center gap-5 md:gap-10 w-full px-5 md:px-20">
      <div>
        <Sheet>
          <SheetTrigger>
            <div className="bg-gray-50 rounded-sm shadow-md p-1 dark:bg-little-dark-bg">
              <GiHamburgerMenu className="w-9 h-auto text-gray-700 dark:text-dark-text" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              {theme === "light" ? (
                <img src={logo} alt="logo" className="w-36 m-auto" />
              ) : (
                <img src={darklogo} alt="dark-logo" className="w-36 m-auto" />
              )}
              <Link to={"/"}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SheetPrimitive.Close className="w-24 border-b-2 dark:border-b-little-dark-bg pb-1 m-auto flex justify-center gap-3 items-center">
                    <MdHome /> Home
                  </SheetPrimitive.Close>
                </motion.div>
              </Link>
              <Link to={user ? "/createBlog" : "/auth"} onClick={handleCreateBlogClick}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SheetPrimitive.Close className="w-24 border-b-2 dark:border-b-little-dark-bg pb-1 mb-3 flex m-auto gap-3 justify-center">
                    Create Blog
                  </SheetPrimitive.Close>
                </motion.div>
              </Link>
              <div>
                <ToggleGroup type="single">
                  <ToggleGroupItem
                    value="italic"
                    aria-label="Toggle italic"
                    onClick={() => {
                      dispatch(setLight("light"));
                    }}
                    className="dark:hover:bg-little-dark-bg dark:hover:text-dark-text"
                  >
                    <MdOutlineLightMode className="text-2xl" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    onClick={() => {
                      dispatch(setDark("dark"));
                    }}
                    className="dark:hover:bg-little-dark-bg dark:hover:text-dark-text"
                  >
                    <MdOutlineDarkMode className="text-2xl" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-2/3 md:w-full">
        <SearchBar />
      </div>
      {user ? (
        <UserProfileDetails />
      ) : (
        <Link to={"/auth"}>
          <div className="bg-gray-50 rounded-sm shadow-md p-3 dark:bg-little-dark-bg cursor-pointer">
            SignUp
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
