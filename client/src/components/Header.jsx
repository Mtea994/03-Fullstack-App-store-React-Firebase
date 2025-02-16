import React, { useState } from "react";
import { Rewards } from "../assets";
import UserProfile from "./admin/UserProfile";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="w-full flex items-center justify-between bg-third pl-6">
      <img
        src={Rewards}
        alt=""
        className="w-64 hidden lg:block h-auto object-cover"
      />
      {/* Search input */}
      <div
        className="flex items-center justify-center bg-[#2a2a2a] rounded-full shadow-lg px-4 py-3
      "
      >
        <input
          type="text"
          placeholder="Search for Apps..."
          className="bg-transparent outline-none border-none text-base font-medium text-textSecondary placeholder:text-textPrimary tracking-wide lg:w-64 2xl:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <UserProfile />
    </div>
  );
};

export default Header;
