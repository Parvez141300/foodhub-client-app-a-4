"use server";
import { orderServices } from "@/services/order.service"
import { updateTag } from "next/cache";

export const updateOderStatus = async (orderId: string, providerId: string, orderStatus: string) => {
    const result = await orderServices.updateOderStatus(orderId, providerId, orderStatus);
    updateTag("provider-orders");
    return result;
}