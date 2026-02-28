import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import React from "react";
import { ModeToggle } from "../common/ModeToggle";

interface UserInfo {
  name: string;
  role: string;
  image: string;
}

const DashboardTopMenuBar = ({ userInfo }: { userInfo: UserInfo }) => {
  console.log(userInfo);
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-xl font-bold">Dashboard</h3>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="flex items-center gap-3">
          {userInfo?.image ? (
            <Avatar size="lg">
              <AvatarImage src={userInfo?.image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          ) : (
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          )}

          <div className="flex flex-col">
            <h4 className="text-sm font-semibold">{userInfo?.name}</h4>
            <h5 className="tex-xs">Role: {userInfo?.role}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopMenuBar;
