import React from "react";
import useApps from "../hooks/apps/useApps";
import { useUsers } from "../hooks/users/index";
import MainLoader from "../components/loaders/MainLoader";
import LeftContainer from "../containers/LeftContainer";
import RightContainer from "../containers/RightContainer";

const Layout = () => {
  const { data, isLoading, isError, refetch } = useApps();
  const {
    data: useData,
    isLoading: userIsLoading,
    isError: userError,
    refetch: userRefetch,
  } = useUsers();

  if (userIsLoading || isLoading) {
    return <MainLoader />;
  }

  return (
    <main className="w-screen min-h-screen flex items-start justify-start">
      {/* LeftSection */}
      <LeftContainer />
      {/* RightSection */}
      <RightContainer />
    </main>
  );
};

export default Layout;
