import React, { useState } from "react";

const InputContainer = (props) => {
  return (
    <input
      {...props}
      className="w-full h-10  bg-textPrimary rounded-md border outline-none shadow-sm border-third 
      text-lg font-semibold font-sans text-secondary px-2 file:bg-heroPrimary file:h-10 file:ml-[-8px] file:shadow-md file:px-3 file:mr-4 file:py-2 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        hover:file:bg-pink-100"
    />
  );
};

export default InputContainer;
