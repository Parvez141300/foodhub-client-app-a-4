import { Route } from "@/types";

export const customerRoutes: Route[] = [
    {
        title: "Customer Dashboard",
        items: [
            {
                title: "Manage Profile",
                url: "/customer-dashboard/manage-profile",
            },
            {
                title: "Cart",
                url: "/customer-dashboard/cart",
            },
            {
                title: "Track Orders",
                url: "/customer-dashboard/track-orders",
            },
        ]
    }
]