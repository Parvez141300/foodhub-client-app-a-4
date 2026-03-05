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
                title: "My Cart",
                url: "/customer-dashboard/my-cart",
            },
            {
                title: "My Wishlist",
                url: "/customer-dashboard/my-wishlist",
            },
            {
                title: "My Orders",
                url: "/customer-dashboard/my-orders",
            },
        ]
    }
]