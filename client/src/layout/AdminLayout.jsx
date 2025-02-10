import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import { FaHouseChimney } from "react-icons/fa6";

const AdminLayout = () => {
  return (
    <div className="w-screen h-auto flex flex-col items-center justify-start">
      <AdminHeader />
      {/* Navigational Container */}
      <div className="w-full h-auto flex items-center justify-center px-4 py-3 gap-12">
        <Link className="text-2xl hover:text-heroPrimary">
          <FaHouseChimney />
        </Link>
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/admin/apps"}
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
          }
        >
          Apps
        </NavLink>
        <NavLink
          to={"/admin/users"}
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
          }
        >
          Users
        </NavLink>
      </div>

      <Outlet />
      <p>Footer</p>
    </div>
  );
};

export default AdminLayout;
