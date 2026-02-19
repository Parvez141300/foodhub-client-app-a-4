import { Route } from "@/types";

export const providerRoutes: Route[] = [
    {
        title: "Provider Dashboard",
        items: [
            {
                title: "Add Menu",
                url: "/provider-dashboard/add-menu",
            },
            {
                title: "Manage Menu",
                url: "/provider-dashboard/manage-menu",
            },
            {
                title: "Orders",
                url: "/provider-dashboard/orders",
            },
            {
                title: "Manage Orders",
                url: "/provider-dashboard/manage-orders",
            },
            {
                title: "Manage Profile",
                url: "/provider-dashboard/manage-profile",
            }
        ]
    }
]