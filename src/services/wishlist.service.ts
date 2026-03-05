import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const wishListService = {
    createWishList: async ({ userId, mealId }: { userId: string, mealId: string }) => {
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
    },
    getUserWishList: async (userId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/wishlist/${userId}`, {
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
    },
    deleteUserWishListItem: async (wishListId: string, userId: string, mealId: string) => {
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
    },
}