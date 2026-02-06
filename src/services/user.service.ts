import { env } from "@/types/env";
import { cookies } from "next/headers"

const AUTH_URL = env.AUTH_URL;

export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            console.log(cookieStore.getAll());
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store"
            });
            const session = await res.json();
            if(session === null) {
                return {message: "session is missing..."}
            }
            return session;
        } catch (error) {
            return {message: error && "something went wrong"}
        }
    },
}