"use server";

import { wishListService } from "@/services/wishlist.service"
import { updateTag } from "next/cache";

export const createWishList = async ({ userId, mealId }: { userId: string, mealId: string }) => {
    const result = await wishListService.createWishList({ userId, mealId });
    return result;
}

export const deleteUserWishListItem = async (wishListId: string, userId: string, mealId: string) => {
    const result = await wishListService.deleteUserWishListItem(wishListId, userId, mealId);
    updateTag("user-wishlist");
    return result;
}