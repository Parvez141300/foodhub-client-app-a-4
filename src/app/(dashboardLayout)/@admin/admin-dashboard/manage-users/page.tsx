import { UsersTable } from "@/components/modules/dashboard/ManageUser/UsersTable";
import { userServices } from "@/services/user.service";
import React from "react";

const ManageUsersPage = async () => {
  const users = await userServices.getAllUser();
  console.log(users);
  return (
    <div className="space-y-5">
      <h1 className="text-xl">Manage Users</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default ManageUsersPage;
