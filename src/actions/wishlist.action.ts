"use server";

import { wishListService } from "@/services/wishlist.service"

export const createWishList = async ({ userId, mealId }: { userId: string, mealId: string }) => {
    const result = await wishListService.createWishList({ userId, mealId });
    return result;
}

export const deleteUserCartItem = async (wishListId: string, userId: string, mealId: string) => {
    const result = await wishListService.deleteUserWishListItem(wishListId, userId, mealId);
    return result;
}