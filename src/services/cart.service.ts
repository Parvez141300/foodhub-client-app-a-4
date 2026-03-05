import { env } from "@/env"
import { cookies } from "next/headers";


const BACKEND_URL = env.BACKEND_URL;

export const cartService = {
    createCartWithCartItem: async ({ userId, mealId, quantity }: { userId: string, mealId: string, quantity: number }) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/cart`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ user_id: userId, meal_id: mealId, quantity: quantity })
        });

        const res = await result.json();

        return res;
    },
    getUserCart: async (userId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/cart/${userId}`, {
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: {
                tags: ["user-cart"]
            }
        });
        const res = await result.json();
        return res;
    }
}