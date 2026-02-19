import { env } from "@/env";

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
}