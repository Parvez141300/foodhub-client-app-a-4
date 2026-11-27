
import { env } from "@/env";
import { cookies } from "next/headers"


const setCookie = async (name: string, value: string, maxAgeInSeconds: number) => {
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
        httpOnly: true,
        maxAge: maxAgeInSeconds,
        path: "/",
        sameSite: "lax",
        secure: env.NEXT_PUBLIC_NODE_ENV === "development" ? false : true,
    });
}

const getCookie = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}

const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
}

export const cookieUtils = {
    setCookie,
    getCookie,
    deleteCookie,
}