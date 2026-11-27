"use server";

import { wishListService } from "@/services/wishlist.service"
import { updateTag } from "next/cache";

export const getUserWishlist = async (queryString?: string) => {
    const result = await wishListService.getUserWishList(queryString);

    return result;
}

export const createWishList = async ({ userId, mealId }: { userId: string, mealId: string }) => {
    const result = await wishListService.createWishList({ userId, mealId });
    return result;
}

export const deleteUserWishListItem = async (wishListId: string, mealId: string) => {
    const result = await wishListService.deleteUserWishListItem(wishListId, mealId);
    updateTag("user-wishlist");
    return result;
}