import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "Admin Dashboard",
        items: [
            {
                title: "Manage Users",
                url: "/admin-dashboard/manage-users",
            },
            {
                title: "All Orders",
                url: "/admin-dashboard/all-orders",
            },
            {
                title: "Manage Categories",
                url: "/admin-dashboard/manage-categories",
            },
            {
                title: "Manage Cuisines",
                url: "/admin-dashboard/manage-cuisines",
            },
            {
                title: "Manage Dietaries",
                url: "/admin-dashboard/manage-dietaries",
            },
            {
                title: "Manage Profile",
                url: "/admin-dashboard/manage-profile",
            },
        ]
    },
]