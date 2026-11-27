import { env } from "@/env";
import { httpClient } from "@/lib/http/httpClient";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const createWishList = async ({ userId, mealId }: { userId: string, mealId: string }) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/wishlist`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ user_id: userId, meal_id: mealId })
    });

    const res = await result.json();

    return res;
}

const getUserWishList = async (queryString?: string) => {
    const response = await httpClient.get(`${env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist?${queryString}`);
    return response;
}

const deleteUserWishListItem = async (wishListId: string, userId: string, mealId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/wishlist/${wishListId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ user_id: userId, meal_id: mealId })
    });
    const res = await result.json();
    return res;
}

export const wishListService = {
    createWishList,
    getUserWishList,
    deleteUserWishListItem,
}