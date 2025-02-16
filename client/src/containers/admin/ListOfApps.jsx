import React from "react";
import useApps from "../../hooks/apps/useApps";
import AppCards from "../../components/admin/AppCards";
import { PuffLoader } from "react-spinners";

const ListOfApps = () => {
  const { data, isLoading, isError, refetch } = useApps();
  console.log(data);

  if (isLoading) {
    return <PuffLoader size={60} color="#ff9e01" />;
  }
  return (
    <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 py-6 px-6 gap-2 grid-rows-10">
      {data.length > 0 &&
        data.map((data) => {
          return <AppCards data={data} />;
        })}
    </div>
  );
};

export default ListOfApps;
