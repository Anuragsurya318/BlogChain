import { SlideUpOut } from "@/animation";
import { Menus, signOutAction } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
  const [isMenu, setIsMenu] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-[46px] h-[46px] flex items-center justify-center rounded-md overflow-hidden cursor-pointer bg-gray-50 shadow-md">
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user?.photoURL}
            alt={user?.displayName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          ></motion.img>
        ) : (
          <p className="text-xl text-black font-semibold capitalize">{user?.email[0]}</p>
        )}
      </div>

      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="w-[46px] h-[46px] rounded-md flex items-center justify-center bg-gray-50 dark:bg-little-dark-bg dark:shadow-dark-shadow shadow-md cursor-pointer"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...SlideUpOut}
            className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-50 flex flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus &&
              Menus.map((menu) => (
                <Link
                  to={menu.uri}
                  key={menu.id}
                  onClick={() => setIsMenu(false)}
                  className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                >
                  {menu.name}
                </Link>
              ))}
            <Link to={"/"}>
              <motion.p
                onClick={signOutAction}
                whileTap={{ scale: 0.9 }}
                className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
              >
                Sign Out
              </motion.p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
