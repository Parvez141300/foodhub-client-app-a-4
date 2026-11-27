import { env } from "@/env";
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
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/wishlist?${queryString}`, {
        headers: {
            "Content-type": "application/json",
            Cookie: cookieStore.toString(),
        },
        next: {
            tags: ["user-wishlist"]
        }
    });
    const res = await result.json();
    return res;
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