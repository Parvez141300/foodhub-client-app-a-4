import { env } from "@/env"
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const orderServices = {
    getAllOrder: async () => {
        const cookieStore = await cookies();
        const result = await fetch(`${BACKEND_URL}/api/orders`, {
            next: {
                tags: ['orders']
            },
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            }
        });
        const res = await result.json();

        return res;
    },
}