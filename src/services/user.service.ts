import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

const BACKEND_URL = env.BACKEND_URL;

export const userServices = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            console.log(cookieStore.toString());
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store"
            });
            const session = await res.json();
            if (session === null) {
                return { message: "session is missing..." }
            }
            return session;
        } catch (error) {
            return { message: error && "something went wrong" }
        }
    },
    getAllUser: async (search?: string) => {
        try {
            const cookieStore = await cookies();
            const result = await fetch(`${BACKEND_URL}/api/admin/users?search=${search || ''}`, {
                next: {
                    tags: ["users"]
                },
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });

            const users = await result.json();
            return users;
        } catch (error: any) {
            console.log(error.message);
            return { data: null };
        }
    },
} 