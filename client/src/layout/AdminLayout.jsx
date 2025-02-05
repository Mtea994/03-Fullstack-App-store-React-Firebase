import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <p>Home</p>
      <Outlet />
      <p>Footer</p>
    </div>
  );
};

export default AdminLayout;
