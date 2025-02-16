import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Flag, Logo } from "../assets/index";
import { ClientMenus } from "../utility/Constanst";
import MenuListItem from "../components/menu/MenuListItem";
const LeftContainer = () => {
  const [isClose, setIsClose] = useState(false);

  return (
    <div
      className={`${
        isClose ? "w-20 px-3" : "w-80"
      } py-3 relative bg-third border-r border-secondary h-screen duration-200 flex flex-col items-center justify-start`}
    >
      {/* absolute action button */}
      <div
        className="absolute -right-3 px-1 py-4 bg-gradient-to-br from-heroPrimary
       to-heroSecondary rounded-md cursor-pointer group "
        onClick={() => setIsClose((prev) => !prev)}
      >
        <FaChevronRight
          className={`text-sm text-white duration-200 ${
            !isClose && "rotate-[540deg]"
          }`}
        />
      </div>

      <div
        className={`w-full  duration-200 inline-flex items-center justify-between gap-2 ${
          !isClose && "px-6"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <img
            src={Logo}
            alt="logo"
            className="w-12 min-w-[48px] object-contain h-auto block float-left mr-5"
          />
          <p
            className={`font-serif text-textPrimary font-extrabold uppercase tracking-[5px] ${
              isClose && "scale-0"
            } duration-200`}
          >
            Oasis <span className="text-heroPrimary block">Bet</span>
          </p>
          <div className={`${isClose && "scale-0"} duration-200 relative`}>
            <div className="flex items-center justify-center">
              <img src={Flag} alt="" className="w-12 h-auto object-contain" />
              <div
                className="absolute -bottom-1 -right-2 w-4 h-4 flex items-center justify-center 
                rounded-full bg-secondary"
              >
                <FaChevronDown className="text-[10px] text-gray-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className={`pt-2 w-full ${isClose ? "px-2" : "px-2"}`}>
        {ClientMenus.map((menu, index) => (
          <MenuListItem menu={menu} key={index} isClose={isClose} />
        ))}
      </ul>
    </div>
  );
};

export default LeftContainer;
