"use server";
import { orderServices } from "@/services/order.service"
import { updateTag } from "next/cache";

export const updateOderStatus = async (orderId: string, providerId: string, orderStatus: string) => {
    const result = await orderServices.updateOderStatus(orderId, providerId, orderStatus);
    updateTag("provider-orders");
    return result;
}

export const createUserOrder = async (payload: any) => {
    const result = await orderServices.createUserOrder(payload);
    return result;
}

export const getUserOrders = async (userId: string) => {
    const result = await orderServices.getUserOrders(userId);
    return result;
}