import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import { useUser } from "../../hooks/users";
import UserProfile from "./UserProfile";

const AdminHeader = () => {
  const { data: userData, isLoading, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!userData || userData.role !== "admin")) {
      console.log(userData);
      navigate("/", { replace: true });
    }
  }, [isLoading, userData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full flex items-center justify-between py-2 px-4">
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={Logo}
          alt="logo image"
          className="w-16 h-auto object-contain"
        />
      </Link>
      {/* Search bar header Center */}
      <UserProfile userData={userData} />
    </div>
  );
};

export default AdminHeader;
