import React from "react";
import { PuffLoader } from "react-spinners";

const MainLoader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PuffLoader size={80} color="#ff9e01" />
    </div>
  );
};

export default MainLoader;
