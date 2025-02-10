import React from "react";
import NewApp from "../../containers/admin/NewApp";
import ListOfApps from "../../containers/admin/ListOfApps";

const AdminApps = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      {/* left section */}
      <NewApp />
      {/* rigth section */}
      <ListOfApps />
    </div>
  );
};

export default AdminApps;
