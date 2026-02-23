import { AppSidebar } from "@/components/layouts/dashboard/app-sidebar";
import DashboardTopMenuBar from "@/components/layouts/dashboard/dashboard-top-menu-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userServices } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const session = await userServices.getSession();
  const userInfo = session?.user;
  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DashboardTopMenuBar userInfo={userInfo} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo?.role === Roles.ADMIN
            ? admin
            : userInfo?.role === Roles.CUSTOMER
              ? customer
              : provider}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
