import { env } from "@/env";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

const BACKEND_URL = env.BACKEND_URL;

export const categoryService = {
    getAllCategory: async () => {
        try {
            const result = await fetch(`${BACKEND_URL}/api/admin/categories`, {
                next: {
                    tags: ["categories"]
                }
            });
            const categories = await result.json();
            return categories;
        } catch (error: any) {
            console.log(error.message);
            return { data: null }
        }
    },
    createCategory: async (categoryName: string, creatorId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/admin/categories`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify({name: categoryName, creator_id: creatorId})
        });

        const res = result.json();
        return res;
    },
}