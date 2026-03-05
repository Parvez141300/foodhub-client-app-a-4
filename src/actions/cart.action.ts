"use server";

import { cartService } from "@/services/cart.service";
import { updateTag } from "next/cache";

export const createCartWithCartItem = async ({ userId, mealId, quantity }: { userId: string, mealId: string, quantity: number }) => {
    const result = await cartService.createCartWithCartItem({ userId, mealId, quantity });

    return result;
}

export const deleteUserCartItem = async (cartId: string, userId: string, mealId: string) => {
    const result = await cartService.deleteUserCartItem(cartId, userId, mealId);
    updateTag("user-cart");
    return result;
}