import { env } from "@/env"
import { cookies } from "next/headers";
import { userServices } from "./user.service";

const BACKEND_URL = env.BACKEND_URL;

const getAllOrder = async () => {
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
}

const getProviderOrders = async () => {
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
}

const updateOderStatus = async (orderId: string, providerId: string, orderStatus: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/provider/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ provider_id: providerId, order_status: orderStatus })
    });
    const res = await result.json();

    return res;
}

const createUserOrder = async (payload: any) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload)
    });
    const res = await result.json();

    return res;
}

const getUserOrders = async (userId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/customer/orders?user_id=${userId}`, {
        next: {
            tags: ['user-orders']
        },
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        }
    });
    const res = await result.json();

    return res;
}

const updateUserPendingOrderStatus = async (orderId: string, orderStatus: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/customer/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ order_status: orderStatus })
    });
    const res = await result.json();

    return res;
}

export const orderServices = {
    getAllOrder,
    getProviderOrders,
    updateOderStatus,
    createUserOrder,
    getUserOrders,
    updateUserPendingOrderStatus,
}