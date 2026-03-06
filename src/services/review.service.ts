import { env } from "@/env";
import { cookies } from "next/headers"

const BACKEND_URL = env.BACKEND_URL;

export const reviewServices = {
    getMealReview: async (mealId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/reviews/${mealId}`, {
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: {
                tags: ["meal-reviews"],
            },
        });

        const res = await result.json();
        return res;
    },
    createMealReview: async (authorId: string, mealId: string, rating: number, comment: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ author_id: authorId, meal_id: mealId, rating: rating, comment: comment })
        });

        const res = await result.json();
        return res;
    }
}