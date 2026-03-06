import LoadingSpinner from "@/components/global/LoadingSpinner";
import { UsersTable } from "@/components/modules/dashboard/ManageUser/UsersTable";
import { userServices } from "@/services/user.service";
import React, { Suspense } from "react";

const ManageUsersPage = async () => {
  const users = await userServices.getAllUser();
  console.log(users);
  return (
    <div className="space-y-5">
      <h1 className="text-xl">Manage Users</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UsersTable users={users} />
      </Suspense>
    </div>
  );
};

export default ManageUsersPage;
