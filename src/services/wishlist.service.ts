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
}