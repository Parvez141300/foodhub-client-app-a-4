import { env } from "@/env";
import { cookies } from "next/headers";

interface GetMealsParams {
    is_featured?: boolean;
    search?: string;
    page?: string;
    limit?: string;
}

interface MealSercieOptions {
    cache: string;
    revalidate: number;
}

const BACKEND_URL = env.BACKEND_URL;

export const mealService = {
    getHomeMeals: async (params?: GetMealsParams, options?: MealSercieOptions) => {
        try {
            const url = new URL(`${BACKEND_URL}/api/meals?`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== null && value !== undefined && value !== '') {
                        url.searchParams.append(key, value);
                    }
                })
            }

            const res = await fetch(url.toString());
            const meals = await res.json();

            return meals;

        } catch (error) {
            console.log(error);
            return { data: null };
        }
    },
    createMeal: async (payload: Record<string, string>) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/provider/meals`,{
            method: "POST",
            headers: {
                'Content-type' : 'application/json',
                cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });

        const res = await result.json();
        return res;
    }
}