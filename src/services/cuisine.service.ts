import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const cuisineService = {
    getAllCuisine: async () => {
        try {
            const result = await fetch(`${BACKEND_URL}/api/admin/cuisines`, {
                next: {
                    tags: ["cuisines"]
                }
            });
            const categories = await result.json();
            return categories;
        } catch (error: any) {
            console.log(error.message);
            return { data: null }
        }
    },
    createCuisine: async (cuisineName: string, creatorId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/admin/cuisines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify({ name: cuisineName, creator_id: creatorId })
        });

        const res = result.json();
        return res;
    },
    deleteCuisine: async (cuisineId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/admin/cuisines/${cuisineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
        });
        const res = result.json();
        return res;
    }
}