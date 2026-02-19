import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "Admin Dashboard",
        items: [
            {
                title: "Users",
                url: "/admin-dashboard/users",
            },
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
                title: "Manage Profile",
                url: "/admin-dashboard/manage-profile",
            },
        ]
    },
]