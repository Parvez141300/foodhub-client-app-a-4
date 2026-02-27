import { getUserProfile } from "@/actions/profile.action";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import UserProfile from "@/components/modules/dashboard/UserProfile/UserProfile";
import React, { Suspense } from "react";

const ManageProfilePage = async () => {
  const user = await getUserProfile();
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfile user={user} />
      </Suspense>
    </div>
  );
};

export default ManageProfilePage;
