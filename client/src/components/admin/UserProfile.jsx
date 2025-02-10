import React, { useState } from "react";
import { FaChevronDown, FaRupeeSign } from "react-icons/fa6";

import { signOutUser } from "../../utility/LogOut";
import { queryClient } from "../../containers/App";
import { Menus } from "../../utility/Constanst";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "../../assets";
import { NavLink } from "react-router-dom";

const UserProfile = ({ userData }) => {
  const [triggerHover, setTriggerHover] = useState(false);
  return (
    <div className="flex gap-4 items-center py-2 px-2 cursor-pointer relative">
      <div>
        <h2 className="text-textPrimary text-lg font-bold capitalize">
          {userData?.name}
        </h2>
        <p className="flex gap-1 items-center text-lg text-heroPrimary">
          <span className="bg-secondary border border-gray-600 rounded-full py-1 px-1">
            <FaRupeeSign className="text-md " />
          </span>
          {userData?.walletBalance || "750,00540"}
        </p>
      </div>
      <div
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center border-heroPrimary 
       relative bg-gradient-to-b from-heroPrimary to bg-heroSecondary"
      >
        <img
          src={userData?.picture || Avatar}
          alt=""
          className=" rounded-full"
        />
        <div
          className="w-4 h-4 absolute bg-secondary rounded-full bottom-1 right-0 border border-gray-600 
        flex items-center justify-center"
        >
          <FaChevronDown
            className="text-xs text-textSecondary"
            onMouseEnter={() => setTriggerHover(true)}
          />
        </div>
      </div>
      {/* dropdown section */}

      <AnimatePresence>
        {triggerHover && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            onMouseLeave={() => setTriggerHover(false)}
            className="w-64 bg-secondary absolute top-14 right-2 rounded-md shadow-md "
          >
            <motion.ul
              className="list-none py-4 px-2"
              transition={{ staggerChildren: 0.5 }}
            >
              {Menus &&
                Menus.map((menu) => {
                  return (
                    (menu?.isAdmin && (
                      <motion.li
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -10,
                            transition: {
                              duration: 0.8,
                            },
                          },
                          show: { opacity: 1, x: 0 },
                        }}
                        className="px-3 py-2 rounded-4xl hover:bg-heroPrimary hover:text-white "
                        key={menu.id}
                      >
                        <NavLink>{menu.menu}</NavLink>
                      </motion.li>
                    )) ||
                    (!menu?.isAdmin && (
                      <motion.li
                        className="px-3 py-2 hover:bg-heroPrimary !important hover:text-white rounded-4xl"
                        key={menu.id}
                      >
                        <NavLink>{menu.menu}</NavLink>
                      </motion.li>
                    ))
                  );
                })}
              <button
                onClick={() => signOutUser(queryClient)}
                className=" mt-2 px-4 py-3 w-full rounded-md bg-textPrimary text-primary cursor-pointer font-bold uppercase 
        active:scale-95 transition-transform ease-in-out duration-150"
              >
                Sign Out
              </button>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
