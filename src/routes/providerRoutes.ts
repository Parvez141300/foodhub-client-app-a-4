import { Route } from "@/types";

export const providerRoutes: Route[] = [
    {
        title: "Provider Dashboard",
        items: [
            {
                title: "Manage Profile",
                url: "/provider-dashboard/manage-profile",
            },
            {
                title: "Create Meal",
                url: "/provider-dashboard/create-meal",
            },
            {
                title: "Manage Meal",
                url: "/provider-dashboard/manage-meal",
            },
            {
                title: "Manage Orders",
                url: "/provider-dashboard/manage-orders",
            },
        ]
    }
]