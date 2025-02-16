import React from "react";
import { useUsers } from "../../hooks/users";
import MainLoader from "../../components/loaders/MainLoader";
import UserListCard from "../../components/admin/UserListCard";
const AdminUsers = () => {
  const { data, isLoading, isError, refetch } = useUsers();

  console.log(data);

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="w-full px-32 py-14 flex flex-wrap items-center justify-start gap-4">
      {data.length > 0 &&
        data.map((user) => <UserListCard key={user?.id} user={user} />)}
    </div>
  );
};

export default AdminUsers;
