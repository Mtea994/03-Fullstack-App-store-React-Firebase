import React from "react";
import { useUsers } from "../../hooks/users";
import { toast } from "react-toastify";
import { updateUserData } from "../../api";

const UserListCard = ({ user }) => {
  const { refetch } = useUsers();
  async function handleUserUpdate(id, data) {
    await updateUserData({
      _id: id,
      ...data,
    });
    await refetch();
    toast.success("Data Saved in the Cloud");
  }
  return (
    <div className="flex flex-col items-center gap-2 border border-gray-500 px-3 py-3 rounded-md shadow-md">
      <div>
        <img src={user?.picture} className="rounded-lg" alt="user picture" />
      </div>
      <h2 className="text-lg font-semibold">{user?.name}</h2>
      <p>Role: {user?.role}</p>
      {user?.role === "admin" ? (
        <button
          className="px-4 py-2  bg-heroPrimary text-white rounded-lg shadow-lg font-bold cursor-pointer"
          onClick={() => handleUserUpdate(user.uid, { role: "member" })}
        >
          Make Member
        </button>
      ) : (
        <button
          className="px-4 py-2  bg-heroPrimary text-white rounded-lg shadow-lg font-bold cursor-pointer"
          onClick={() => handleUserUpdate(user.uid, { role: "admin" })}
        >
          Make Admin
        </button>
      )}
    </div>
  );
};

export default UserListCard;
