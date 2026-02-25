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

// {
//     "id": "G9zZwtR4BiiNUtK7UUjLb6Lfneb9qgfi",
//     "name": "Parvez",
//     "email": "parvez@gmail.com",
//     "emailVerified": false,
//     "image": null,
//     "createdAt": "2026-01-30T15:52:19.660Z",
//     "updatedAt": "2026-01-30T15:52:19.660Z",
//     "role": "CUSTOMER",
//     "phone": null,
//     "is_active": "ACTIVE"
// }

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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
