import { env } from "@/env"
import { cookies } from "next/headers";


const BACKEND_URL = env.BACKEND_URL;

const createCartWithCartItem = async ({ userId, mealId, quantity }: { userId: string, mealId: string, quantity: number }) => {
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
}

const getUserCart = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/cart`, {
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

const deleteUserCartItem = async (cartId: string, userId: string, mealId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/cart/${cartId}`, {
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

export const cartService = {
    createCartWithCartItem,
    getUserCart,
    deleteUserCartItem,
}