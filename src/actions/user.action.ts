'use server';
import { userServices } from "@/services/user.service"
import { updateTag } from "next/cache";

export const getAllUser = async (search: string) => {
    const result = await userServices.getAllUser(search);
    updateTag('users');
    return result;
}

export const getCurrentUser = async () => {
    const result = await userServices.getSession();
    return result;
}

export const updateUserStatus = async (userId: string, userStatus: string) => {
    const result = await userServices.updateUserStatus(userId, userStatus);
    const data = await result.json();
    updateTag("users");
    return {
        ok: result.ok,
        status: result.status,
        data,
    };
}