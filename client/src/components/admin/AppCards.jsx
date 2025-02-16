import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../utility/URL";
import { toast } from "react-toastify";
import useApps from "../../hooks/apps/useApps";

const AppCards = ({ data }) => {
  const [isDelete, setisDelete] = useState(false);
  console.log(data, "DATA ID");
  const { refetch } = useApps();
  async function handleDelete(query) {
    const response = await fetch(`${BASE_URL}/deleteApp?id=${query}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Error Occured: Unable to Delter");
    }

    await response.json();
    setisDelete(false);
    await refetch();

    toast.success("App Deleted");
  }
  return (
    <>
      <div className="flex items-end justify-between border-2 px-2 py-2 rounded-md bg-secondary border-heroPrimary shadow-md">
        <div className="flex gap-3">
          <div className="appIcon w-16 h-16 rounded-sm">
            <img src={data?.appIcon} className="w-16 h-16 rounded-sm" alt="" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-white">{data?.title}</h2>
            <p className="text-sm text-heroSecondary">{data?.company}</p>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => setisDelete(true)}>
          <FaTrash className="text-red-500 shadow-md " />
        </div>
      </div>
      <AnimatePresence>
        {isDelete && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="border rounded-md border-heroPrimary p-4 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-medium">
                Are you sure you want to delete it ?
              </h2>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-teal-400 hover:border-none hover:text-black"
                  onClick={() => handleDelete(data?._id)}
                >
                  Yes
                </button>
                <button
                  className="outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-red-400 hover:border-none hover:text-black cursor-pointer"
                  onClick={() => setisDelete(false)}
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppCards;
