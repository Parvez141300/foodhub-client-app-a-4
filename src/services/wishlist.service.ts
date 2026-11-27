import { env } from "@/env";
import { httpClient } from "@/lib/http/httpClient";
import { IPaginatedData } from "@/types/pagination.type";
import { IWishlist } from "@/types/wishlist.type";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const createWishList = async (mealId: string) => {
    const response = await httpClient.post(`${env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist`, {
        meal_id: mealId,
    });
    console.log("delete wish list response", response);
    return response;
}

const getUserWishList = async (queryString?: string) => {
    const response = await httpClient.get<IPaginatedData<IWishlist>>(`${env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist?${queryString}`);
    return response;
}

const deleteUserWishListItem = async (wishListId: string, mealId: string) => {
    const response = await httpClient.delete(`${env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist/${wishListId}`, {
        meal_id: mealId,
    });
    console.log("delete wish list response", response);
    return response;
}

export const wishListService = {
    createWishList,
    getUserWishList,
    deleteUserWishListItem,
}