import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RightContainer = () => {
  return (
    <div className="flex-1">
      {/* header Section */}
      <Header />
      <section className="w-full h-[calc(100vh-80px)]">
        <Outlet />
      </section>
    </div>
  );
};

export default RightContainer;
