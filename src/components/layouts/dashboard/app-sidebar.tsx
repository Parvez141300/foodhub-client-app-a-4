import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { Route } from "@/types";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";
import Logo from "@/components/global/Logo";

export function AppSidebar({
  userInfo,
  ...props
}: {
  userInfo: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];
  switch (userInfo?.role) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.CUSTOMER:
      routes = customerRoutes;
      break;
    case Roles.PROVIDER:
      routes = providerRoutes;
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-start items-center">
          <Logo /> <span className="font-bold">Eat Food BD</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="flex items-center gap-3">
              <LayoutDashboardIcon />
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
