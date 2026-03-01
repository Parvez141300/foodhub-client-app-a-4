import { env } from "@/env"
import { cookies } from "next/headers";
import { userServices } from "./user.service";

const BACKEND_URL = env.BACKEND_URL;

export const orderServices = {
    getAllOrder: async () => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/orders`, {
            next: {
                tags: ['all-orders']
            },
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            }
        });
        const res = await result.json();

        return res;
    },
    getProviderOrders: async () => {
        const cookieStore = await cookies();
        const session = await userServices.getSession();
        const providerId = session?.user?.id;
        const result = await fetch(`${BACKEND_URL}/api/provider/orders/${providerId}`, {
            next: {
                tags: ['provider-orders']
            },
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            }
        });
        const res = await result.json();

        return res;
    },
    updateOderStatus: async (orderId: string, providerId: string, orderStatus: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/provider/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({provider_id: providerId, order_status: orderStatus})
        });
        const res = await result.json();

        return res;
    },
}