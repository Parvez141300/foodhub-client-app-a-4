import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const getAllDietary = async () => {
    try {
        const result = await fetch(`${BACKEND_URL}/api/admin/dietaries`, {
            next: {
                tags: ["dietaries"]
            }
        });
        const dietaries = await result.json();
        return dietaries;
    } catch (error: any) {
        console.log(error.message);
        return { data: null }
    }
}

const createDietary = async (dietaryName: string, creatorId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/admin/dietaries`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify({ name: dietaryName, creator_id: creatorId })
    });

    const res = result.json();
    return res;
}

const deleteDietary = async (dietaryId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${BACKEND_URL}/api/admin/dietaries/${dietaryId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
    });
    const res = result.json();
    return res;
}

export const dietaryService = {
    getAllDietary,
    createDietary,
    deleteDietary,
}