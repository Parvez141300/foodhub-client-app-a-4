"use server";

import { cartService } from "@/services/cart.service";

export const createCartWithCartItem = async ({ userId, mealId, quantity }: { userId: string, mealId: string, quantity: number }) => {
    const result = await cartService.createCartWithCartItem({ userId, mealId, quantity });

    return result;
}
