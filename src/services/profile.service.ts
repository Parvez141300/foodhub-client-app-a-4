import { env } from "@/env"

const BACKEND_URL = env.BACKEND_URL;

export const profileServices = {
    getUserProfile: async (userId: string) => {
        const result = await fetch(`${BACKEND_URL}/api/profiles/${userId}`, {
            next: {
                tags: ['profiles']
            }
        });
        const res = await result.json();

        return res;
    },
}