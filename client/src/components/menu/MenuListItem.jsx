import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const MenuListItem = ({ menu, isClose }) => {
  const [isSubmenu, setIsSubmenu] = useState(false);
  return (
    <>
      <li
        className={`group flex items-center gap-x-4 cursor-pointer p-2 px-3  hover:bg-[#282828]
         hover:shadow-lg rounded-md w-full ${menu.spacing ? "mt-12" : "mt-4"} ${
          isSubmenu ? "bg-[#282828]" : "bg-primary"
        }`}
        onClick={() => setIsSubmenu((prev) => !prev)}
      >
        <span
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-third group-hover:bg-gradient-to-br group-hover:from-heroPrimary group-hover:to-heroSecondary ${
            isSubmenu && "bg-gradient-to-br from-heroPrimary to-heroSecondary"
          }`}
        >
          {
            <menu.Icon
              className={`text-xl block float-left text-textPrimary hover:text-textSecondary ${
                isSubmenu && "text-textSecondary"
              }`}
            />
          }
        </span>
        <span
          className={`text-textPrimary group-hover:text-textSecondary flex-1 text-base font-medium duration-200 ${
            isClose && "hidden"
          } ${isSubmenu && "text-textSecondary"}`}
        >
          {menu.title}
        </span>
        {menu.submenu && !isClose && (
          <FaChevronDown
            className={`text-textPrimary duration-200 ${
              isSubmenu && "text-textSecondary rotate-180"
            }`}
          />
        )}
      </li>
      <AnimatePresence>
        {menu.submenu && !isClose && isSubmenu && (
          <motion.ul
            className="bg-primary mt-2 rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {menu.subMenuItems.map((item, index) => (
              <li
                className={`group flex items-center gap-x-4 cursor-pointer py-3 px-4 w-full`}
              >
                <span>
                  {
                    <menu.Icon
                      className={`text-xl block float-left text-textPrimary group-hover:text-heroPrimary`}
                    />
                  }
                </span>
                <span
                  className={`text-textPrimary group-hover:text-heroPrimary text-base font-medium flex-1 duration-200 ${
                    isClose && "hidden"
                  }`}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuListItem;
