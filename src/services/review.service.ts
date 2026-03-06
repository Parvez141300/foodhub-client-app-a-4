import { env } from "@/env";
import { cookies } from "next/headers"

const BACKEND_URL=env.BACKEND_URL;

export const reviewServices = {
    getMealReview: async (mealId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/reviews/${mealId}`, {
            headers: {
                "Content-type" : "application/json",
                Cookie: cookieStore.toString(),
            },
            next: {
                tags: ["meal-reviews"],
            },
        });

        const res = await result.json();
        return res;
    },
}