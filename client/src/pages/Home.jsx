import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.config";
import Banner from "../components/Banner";
import useApps from "../hooks/apps/useApps";
import MainLoader from "../components/loaders/MainLoader";
import { AnimatePresence, motion } from "framer-motion";
import { MdStar } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import ChatContainer from "../containers/ChatContainer";

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { data, isLoading, isError, refetch } = useApps();

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4">
      {/* left Section */}
      <div className="col-span-12 lg:col-span-8 overflow-y-scroll scrollbar-none">
        <Banner />
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 py-4">
          {data &&
            data.length > 0 &&
            data.map((app) => (
              <>
                <div
                  className="duration-200 w-full rounded-md overflow-hidden relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src={app?.cover}
                    alt=""
                    className="w-full h-64 object-cover duration-200"
                  />

                  <AnimatePresence>
                    {isHovered && (
                      <Link to={`app/${app?._id}`}>
                        <motion.div
                          className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-between px-2 py-4"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                              <MdStar className="text-heroPrimary text-base" />
                              <p className="text-xs">{app?.totalReviews}</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <FaHeart className="text-red-500 text-md 2xl:text-base" />
                            </div>
                          </div>

                          <div className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm 2xl:text-base text-[rgba(255,255,255,0.8)]">
                              {app?.title}
                            </p>
                            <p className="text-xs 2xl:text-base text-heroSecondary">
                              {app?.company}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ))}
        </div>
      </div>
      <div className="col-span-4 h-full hidden lg:block">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;
