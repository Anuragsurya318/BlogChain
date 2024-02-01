import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { SearchBar } from "../container/index";
import logo from "../assets/logo.png";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserProfileDetails } from "./index";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const handleCreateBlogClick = () => {
    if (!user) {
      alert("Please log in first");
    }
  };

  return (
    <div className="flex h-[120px] shadow-md justify-between items-center gap-5 md:gap-10 w-full px-5 md:px-20">
      <div>
        <Sheet>
          <SheetTrigger>
            <div className="bg-gray-50 rounded-sm shadow-md p-1">
              <GiHamburgerMenu className="w-9 h-auto text-gray-700" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <img src={logo} alt="logo" className="w-36 m-auto" />
              <Link to={"/home"}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SheetPrimitive.Close className="w-24 border-b-2 pb-1 m-auto flex justify-center gap-3 items-center">
                    <MdHome /> Home
                  </SheetPrimitive.Close>
                </motion.div>
              </Link>
              <Link to={user ? "/createBlog" : "/home/auth"} onClick={handleCreateBlogClick}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SheetPrimitive.Close className="w-24 border-b-2 pb-1 mb-3 flex m-auto gap-3 justify-center">
                    Create Blog
                  </SheetPrimitive.Close>
                </motion.div>
              </Link>
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
        <Link to={"/home/auth"}>
          <div className="bg-gray-50 rounded-sm shadow-md p-3 cursor-pointer">SignUp</div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
