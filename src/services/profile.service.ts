import { env } from "@/env"
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const profileServices = {
    getUserProfile: async (userId: string) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/profiles/${userId}`, {
            next: {
                tags: ['profiles']
            },
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            }
        });
        const res = await result.json();

        return res;
    },
    updateUserProfile: async (payload: Record<string, string>) => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/profiles`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });
        const res = await result.json();

        return res;
    }
}