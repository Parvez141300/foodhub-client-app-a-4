"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import NoUsersFound from "./NoUsersFound";
import { UserStatus } from "@/constants/roles";
import { updateUserStatus } from "@/actions/user.action";
import { toast } from "sonner";

type UsersType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  is_active: string;
};

export function UsersTable({ users }: { users: UsersType[] }) {
  const handleUpdateStatus = async (userId: string, userStatus: string) => {
    console.log("id and stattus", userId, userStatus);

    const toastId = toast.loading("Updating user status");
    try {
      const res = await updateUserStatus(userId, userStatus);
      if (!res.ok) {
        return toast.error("This user does not exists to update", {
          id: toastId,
        });
      } else {
        return toast.success("Successfully updated user status", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
      console.log(error.message);
    }
  };

  if (!users.length) {
    return <NoUsersFound />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Email Verified</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell className="font-medium">{user?.id}</TableCell>
            <TableCell className="font-medium">{user?.name}</TableCell>
            <TableCell>{user?.role}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{String(user?.emailVerified)}</TableCell>
            <TableCell>
              {new Date(user?.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(user?.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{String(user?.is_active)}</TableCell>
            {/* action */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user?.is_active === "ACTIVE" ? (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUpdateStatus(user?.id, UserStatus.SUSPEND)
                      }
                    >
                      SUSPEND
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUpdateStatus(user?.id, UserStatus.ACTIVE)
                      }
                    >
                      ACTIVE
                    </DropdownMenuItem>
                  )}

                  {/* <DropdownMenuSeparator /> */}
                  {/* <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
