"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function DashboardAvatar({
  userInfo,
  onLogout,
}: {
  userInfo: any;
  onLogout: () => void;
}) {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          try {
            toast.success("Logged out successfully");
            onLogout();
            location.reload();
          } catch (error: any) {
            toast.error(error.message);
          }
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:cursor-pointer"
        >
          {userInfo?.image ? (
            <Avatar>
              <AvatarImage src={userInfo?.image} alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LayoutDashboardIcon />
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          <span onClick={handleLogout} className="hover:cursor-pointer">
            Sign out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
